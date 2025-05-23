import submitForm from './submitForm';
import "./ContactForm.css";

export default function ContactForm(props) {
  return (
    <form
      action='https://www.greatfrontend.com/api/questions/contact-form'
      method="post"
      onSubmit={submitForm}
      {...props}
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required/>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required/>
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows={4} required />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}
