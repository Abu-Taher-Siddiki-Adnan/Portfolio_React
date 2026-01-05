import { FaGithub, FaYoutube, FaDownload } from 'react-icons/fa'
import { useState } from 'react'

const Projects = ({ onOpenModal }) => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      category: 'django',
      title: 'Student Management System',
      description: 'A comprehensive Django web application for managing student records, courses, and academic information with admin and faculty access controls.',
      tech: ['Django', 'Python', 'SQLite', 'Bootstrap'],
      github: 'https://github.com/Abu-Taher-Siddiki-Adnan/Student_Management_System',
      demoModal: 1
    },
    {
      id: 2,
      category: 'django',
      title: 'Library Management System',
      description: 'A Django-based system for managing library operations including book inventory, member management, and borrowing/returning processes.',
      tech: ['Django', 'Python', 'SQLite', 'HTML/CSS'],
      github: 'https://github.com/Abu-Taher-Siddiki-Adnan/Library_Management_System',
      demoModal: 2
    },
    {
      id: 3,
      category: 'django',
      title: 'TechBazar E-Commerce',
      description: 'An e-commerce platform built with Django for selling tech products, featuring user authentication, shopping cart, and payment processing.',
      tech: ['Django', 'Python', 'JavaScript', 'Stripe API'],
      github: 'https://github.com/Abu-Taher-Siddiki-Adnan/TechBazar',
      demoModal: 3
    },
    {
      id: 4,
      category: 'flutter',
      title: 'Personality Quiz App',
      description: 'A fun and engaging Flutter mobile application that helps users discover their personality type through a series of interactive questions.',
      tech: ['Flutter', 'Dart', 'Android', 'iOS'],
      github: 'https://github.com/Abu-Taher-Siddiki-Adnan/Personality_Quiz_Flutter_App',
      download: 'https://github.com/Abu-Taher-Siddiki-Adnan/Personality_Quiz_Flutter_App/releases/download/v1.0.0/app-release.apk',
      demoModal: 4
    },
    {
      id: 5,
      category: 'flutter',
      title: 'ZenDo Task Manager',
      description: 'A productivity-focused Flutter application for managing tasks and to-do lists with an intuitive interface and reminder functionality.',
      tech: ['Flutter', 'Dart', 'SQLite', 'Notifications'],
      github: 'https://github.com/Abu-Taher-Siddiki-Adnan/ZenDo',
      download: 'https://github.com/Abu-Taher-Siddiki-Adnan/ZenDo/releases/download/v1.1.0/app-release.apk',
      demoModal: 5
    }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>

        <div className="project-filters">
          <button 
            className={`filter-label ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={`filter-label ${filter === 'django' ? 'active' : ''}`}
            onClick={() => setFilter('django')}
          >
            Django
          </button>
          <button 
            className={`filter-label ${filter === 'flutter' ? 'active' : ''}`}
            onClick={() => setFilter('flutter')}
          >
            Flutter
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card" data-category={project.category}>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> Code
                  </a>
                  {project.download && (
                    <a href={project.download} target="_blank" rel="noopener noreferrer">
                      <FaDownload /> Download APK
                    </a>
                  )}
                  <button 
                    className="demo-btn"
                    onClick={() => onOpenModal(project.demoModal)}
                  >
                    <FaYoutube /> Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects