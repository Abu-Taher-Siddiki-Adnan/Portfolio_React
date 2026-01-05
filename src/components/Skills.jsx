import { FaPython, FaCode, FaDatabase, FaMobileAlt } from 'react-icons/fa'
import { SiDart, SiDjango } from 'react-icons/si'

const Skills = () => {
  const skills = [
    { icon: <FaPython />, name: 'Python' },
    { icon: <FaCode />, name: 'C/C++' },
    { icon: <SiDjango />, name: 'Django' },
    { icon: <SiDart />, name: 'Dart' },
    { icon: <FaMobileAlt />, name: 'Flutter' },
  ]

  return (
    <section id="skills-section">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid" id="skills">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills