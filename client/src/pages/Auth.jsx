import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {request,useSession} from '../auth/session';
export default function Auth({signup=false}){
 const [values,setValues]=useState({name:'',email:'',password:''});const [error,setError]=useState('');const [busy,setBusy]=useState(false);const {save}=useSession();const navigate=useNavigate();
 async function submit(e){e.preventDefault();setBusy(true);setError('');try{if(signup){await request('/api/users','POST',values);navigate('/signin')}else{save(await request('/auth/signin','POST',{email:values.email,password:values.password}));navigate('/records/contacts')}}catch(e){setError(e.message)}finally{setBusy(false)}}
 return <section className="page"><h1>{signup?'Sign Up':'Sign In'}</h1><form className="contact-form" onSubmit={submit}>{(signup?['name','email','password']:['email','password']).map(k=><label key={k}>{k[0].toUpperCase()+k.slice(1)}<input required type={k==='password'?'password':k==='email'?'email':'text'} minLength={k==='password'&&signup?6:undefined} value={values[k]} onChange={e=>setValues({...values,[k]:e.target.value})}/></label>)}{error&&<p role="alert">{error}</p>}<button disabled={busy}>{signup?'Create account':'Sign in'}</button><p><Link to={signup?'/signin':'/signup'}>{signup?'Already registered? Sign in':'Create an account'}</Link></p></form></section>
}
