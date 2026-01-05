const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Abu Taher Siddiki Adnan</h1>
            <div className="hero-tagline">
              Flutter Developer | Competitive Programmer | ML & AI Enthusiast | Teaching Assistant at IIUC
            </div>
            <p className="hero-bio">
              I'm a passionate Flutter developer who crafts elegant, high-performance mobile apps with a focus on user experience and modular design. As a competitive programmer, I thrive on solving algorithmic challenges and optimizing code under pressure. My curiosity in Machine Learning and AI drives me to explore intelligent systems and data-driven solutions. At IIUC, I serve as a Teaching Assistant, mentoring peers and fostering a collaborative learning environment. I love turning complex ideas into polished, impactful products.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn">View My Work</a>
              <a href="#contact" className="btn btn-outline">Contact Me</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/myImage.png" alt="Abu Taher Siddiki Adnan" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero