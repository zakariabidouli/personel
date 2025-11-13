"""
Script to populate the database with real portfolio data.
Run with: python -m scripts.seed_data
Or: python scripts/seed_data.py
"""

import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models import (
    Project, Experience, Skill, SkillCategory, 
    Contact, About, Stat, SocialLink
)
from datetime import datetime

def get_timestamp():
    """Get current timestamp as string"""
    return datetime.now().isoformat()

def seed_projects(db: Session):
    """Seed projects table"""
    projects = [
        {
            "title": "PingPong - Multiplayer Game",
            "description": "Real-time multiplayer game platform built as part of 1337 School curriculum. Features live player interactions, matchmaking system, and responsive gameplay with modern web technologies.",
            "image": "/transcendence-game.png",
            "tags": ["Next.js", "React", "TypeScript", "WebSocket"],
            "live_url": None,
            "github_url": "https://github.com/zakariabidouli/transcendence",
            "featured": "true",
            "order_index": 0
        },
        {
            "title": "Webserv - HTTP Server",
            "description": "Custom HTTP/1.1 server implementation in C++ from scratch. Built with non-blocking I/O, handles concurrent connections, and supports modern HTTP features. Deep dive into networking fundamentals.",
            "image": "/http-server-architecture.png",
            "tags": ["C++", "HTTP", "Networking", "Concurrency"],
            "live_url": None,
            "github_url": "https://github.com/zakariabidouli/webserv",
            "featured": "true",
            "order_index": 1
        },
        {
            "title": "Healthcare Management System",
            "description": "Full-stack healthcare application with secure patient data management, appointment scheduling, and medical records tracking. Built with enterprise-grade architecture and security practices.",
            "image": "/healthcare-dashboard.png",
            "tags": ["Spring Boot", "PostgreSQL", "Vaadin", "Docker"],
            "live_url": None,
            "github_url": None,
            "featured": "true",
            "order_index": 2
        },
        {
            "title": "Supply Chain Analytics Dashboard",
            "description": "Interactive data warehouse visualization dashboard for supply chain management. Features real-time inventory tracking, predictive alerts for stock levels, and comprehensive logistics analytics.",
            "image": "/supply-chain-dashboard.png",
            "tags": ["Python", "PostgreSQL", "Data Visualization"],
            "live_url": None,
            "github_url": None,
            "featured": "true",
            "order_index": 3
        }
    ]
    
    for project_data in projects:
        project = Project(**project_data, created_at=get_timestamp(), updated_at=get_timestamp())
        db.add(project)
    
    print(f"✓ Seeded {len(projects)} projects")

def seed_experiences(db: Session):
    """Seed experiences table"""
    experiences = [
        {
            "role": "Full-Stack Software Engineer",
            "company": "Fekra Systems",
            "period": "Apr 2024 - Aug 2025",
            "start_date": "2024-04",
            "end_date": "2025-08",
            "description": "Built and maintained healthcare applications using Spring Boot and PostgreSQL. Developed reusable front-end components with Vaadin, designed efficient database schemas, and implemented CI/CD pipelines with Docker and Jenkins.",
            "tags": ["Spring Boot", "PostgreSQL", "Vaadin", "Docker", "Jenkins"],
            "order_index": 0
        },
        {
            "role": "Supply Chain Intern",
            "company": "Alyatec",
            "period": "Apr 2021 - Jul 2021",
            "start_date": "2021-04",
            "end_date": "2021-07",
            "description": "Created an interactive dashboard to visualize supply chain data warehouse and implemented intelligent notification system to prevent stock shortages and overstock situations.",
            "tags": ["Python", "Data Visualization", "SQL", "Analytics"],
            "order_index": 1
        },
        {
            "role": "Software Engineering Student",
            "company": "1337 School (42 Network)",
            "period": "Sep 2021 - Present",
            "start_date": "2021-09",
            "end_date": None,
            "description": "Intensive peer-to-peer learning program focused on software engineering fundamentals. Built multiple complex projects including a multiplayer game platform and HTTP server from scratch.",
            "tags": ["Bash", "C", "C++", "Python", "React", "Next.js", "System Programming"],
            "order_index": 2
        }
    ]
    
    for exp_data in experiences:
        experience = Experience(**exp_data, created_at=get_timestamp(), updated_at=get_timestamp())
        db.add(experience)
    
    print(f"✓ Seeded {len(experiences)} experiences")

def seed_skills(db: Session):
    """Seed skills and skill categories"""
    categories_data = [
        {
            "name": "Backend Development",
            "order_index": 0,
            "skills": ["Spring Boot", "FastApi", "C++", "NestJS", "REST APIs"]
        },
        {
            "name": "Frontend Development",
            "order_index": 1,
            "skills": ["React", "Next.js", "TypeScript", "JavaScript", "Vaadin"]
        },
        {
            "name": "Databases",
            "order_index": 2,
            "skills": ["PostgreSQL",  "MongoDB", "Redis", "GraphQL"]
        },
        {
            "name": "DevOps & Tools",
            "order_index": 3,
            "skills": ["Docker", "Jenkins", "Git", "Linux/Unix", "Bash", "CI/CD"]
        }
    ]
    
    for cat_data in categories_data:
        skills_list = cat_data.pop("skills")
        category = SkillCategory(**cat_data, created_at=get_timestamp(), updated_at=get_timestamp())
        db.add(category)
        db.flush()  # Get the category ID
        
        for idx, skill_name in enumerate(skills_list):
            skill = Skill(
                name=skill_name,
                category_id=category.id,
                order_index=idx,
                created_at=get_timestamp(),
                updated_at=get_timestamp()
            )
            db.add(skill)
    
    print(f"✓ Seeded {len(categories_data)} skill categories with skills")

def seed_about(db: Session):
    """Seed about content and stats"""
    about_content = [
        {
            "section": "intro",
            "content": "I'm a full-stack developer passionate about crafting user friendly, well-engineered solutions. With experience across backend and frontend technologies, I enjoy tackling complex problems.",
            "order_index": 0
        },
        {
            "section": "paragraph1",
            "content": "My journey in software development has taken me through diverse projects—from building healthcare systems with Spring Boot to developing real-time multiplayer games with React and Next.js. I'm comfortable working across the stack, whether it's designing database schemas, implementing REST APIs, or creating intuitive user interfaces.",
            "order_index": 1
        },
        {
            "section": "paragraph2",
            "content": "Currently still sharpening my skills at 1337 School (42 Network), where I've learn and built everything from Shell in C, HTTP servers in C++ to modern web applications. I believe in continuous learning and enjoy exploring new technologies while maintaining a focus on fundamentals.",
            "order_index": 2
        },
        {
            "section": "paragraph3",
            "content": "I'm always looking for new challenges and opportunities to grow. If you're interested in working with me, please don't hesitate to contact me.",
            "order_index": 3
        }
    ]
    
    stats = [
        {"number": "4+", "label": "Major Projects", "order_index": 0},
        {"number": "2+", "label": "Years Experience", "order_index": 1},
        {"number": "10+", "label": "Technologies", "order_index": 2},
        {"number": "100%", "label": "Passion", "order_index": 3}
    ]
    
    for about_data in about_content:
        about = About(**about_data, created_at=get_timestamp(), updated_at=get_timestamp())
        db.add(about)
    
    for stat_data in stats:
        stat = Stat(**stat_data, created_at=get_timestamp(), updated_at=get_timestamp())
        db.add(stat)
    
    print(f"✓ Seeded {len(about_content)} about sections and {len(stats)} stats")

def seed_social_links(db: Session):
    """Seed social links"""
    social_links = [
        {
            "platform": "github",
            "url": "https://github.com/zakariabidouli",
            "icon_name": "Github",
            "order_index": 0
        },
        {
            "platform": "linkedin",
            "url": "https://linkedin.com/in/zakariabidouli",
            "icon_name": "Linkedin",
            "order_index": 1
        },
        {
            "platform": "email",
            "url": "mailto:bidouli.zak@gmail.com",
            "icon_name": "Mail",
            "order_index": 2
        },
        # {
        #     "platform": "repository",
        #     "url": "https://github.com/zakariabidouli/personel",
        #     "icon_name": "repository",
        #     "order_index": 3
        # }
    ]
    
    for link_data in social_links:
        link = SocialLink(**link_data, created_at=get_timestamp(), updated_at=get_timestamp())
        db.add(link)
    
    print(f"✓ Seeded {len(social_links)} social links")

def seed_contacts(db: Session):
    """Seed sample contact submissions (optional)"""
    contacts = []
    
    for contact_data in contacts:
        contact = Contact(**contact_data, created_at=get_timestamp(), updated_at=get_timestamp())
        db.add(contact)
    
    print(f"✓ Seeded {len(contacts)} contact submissions")

def main():
    """Main function to seed all data"""
    print("🌱 Starting database seeding...")
    print("-" * 50)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Clear existing data (optional - comment out if you want to keep existing data)
        print("🗑️  Clearing existing data...")
        db.query(Contact).delete()
        db.query(Skill).delete()
        db.query(SkillCategory).delete()
        db.query(Stat).delete()
        db.query(About).delete()
        db.query(SocialLink).delete()
        db.query(Experience).delete()
        db.query(Project).delete()
        db.commit()
        print("✓ Cleared existing data")
        print("-" * 50)
        
        # Seed data
        seed_projects(db)
        seed_experiences(db)
        seed_skills(db)
        seed_about(db)
        seed_social_links(db)
        seed_contacts(db)
        
        db.commit()
        print("-" * 50)
        print("✅ Database seeding completed successfully!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    main()