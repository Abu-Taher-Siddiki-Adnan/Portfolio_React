import { FaEnvelope, FaMapMarkerAlt, FaYoutube, FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa'
import { useForm, ValidationError } from '@formspree/react'

const Contact = () => {
  const [state, handleSubmit] = useForm("xlgdvaoz")

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope />
              <div>
                <h3>Email</h3>
                <p>adnan02802@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt />
              <div>
                <h3>Location</h3>
                <p>Chattogram, Bangladesh</p>
              </div>
            </div>
            <div className="social-links">
              <a href="https://www.youtube.com/@AbuTaherSiddikiAdnan" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="https://www.facebook.com/adnan.siddik.282" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/in/abu-taher-siddiki-adnan/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/Abu-Taher-Siddiki-Adnan" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://wa.me/+8801601897826" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className="contact-form">
            {state.succeeded ? (
              <div className="success-message">
                <h3>Thank You! 🎉</h3>
                <p>Your message has been sent successfully. I'll get back to you soon!</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn"
                  style={{marginTop: '20px'}}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    disabled={state.submitting}
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    disabled={state.submitting}
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    disabled={state.submitting}
                    rows="5"
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn"
                  disabled={state.submitting}
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact