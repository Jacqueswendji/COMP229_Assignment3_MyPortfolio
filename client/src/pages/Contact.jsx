// Contact.jsx
// Contact page for the personal portfolio website.

// Contact.jsx
// Contact page for the personal portfolio website.

import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSession,request} from '../auth/session';
function Contact() {
 const {session}=useSession();
 const empty={firstname:'',lastname:'',email:'',contactNumber:'',message:''};
 const [values,setValues]=useState(empty);const [status,setStatus]=useState('');const [busy,setBusy]=useState(false);
 async function submit(e){e.preventDefault();setBusy(true);setStatus('');try{await request('/api/contacts','POST',values,session.token);setValues(empty);setStatus('Contact saved successfully.')}catch(e){setStatus(e.message)}finally{setBusy(false)}}
  return (
    <section className="page contact-page">
      <h1>Contact Me</h1>

      <p className="page-introduction">
        Feel free to contact me for professional, academic, or
        project-related opportunities.
      </p>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>

          <p>
            <strong>Name:</strong> Jacques Honoré Wendji
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:jacqueswendji@yahoo.com">
              jacqueswendji@yahoo.com
            </a>
          </p>

          <p>
            <strong>Location:</strong> Ontario, Canada
          </p>
        </div>

        <div className="contact-form"><h2>Contact records</h2>{session?.user.role==='admin'&&<form onSubmit={submit}>{Object.entries({firstname:'First name',lastname:'Last name',email:'Email',contactNumber:'Contact number',message:'Message'}).map(([k,label])=><label key={k}>{label}<input required type={k==='email'?'email':'text'} value={values[k]} onChange={e=>setValues({...values,[k]:e.target.value})}/></label>)}<button disabled={busy}>Save contact</button><p role="status">{status}</p></form>}<p>{session?.user.role==='admin'?'Create or manage contact records.':'Sign in to view contact records. Only administrators can create or modify records.'}</p><Link className="button" to={session?'/records/contacts':'/signin'}>Open contact records</Link></div>
      </div>
    </section>
  );
}

export default Contact;