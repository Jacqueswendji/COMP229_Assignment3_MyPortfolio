import {test} from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import app from '../server/express.js';
import User from '../server/models/user.model.js';
test('MongoDB integration: authentication and role-based CRUD',async()=>{
 const db='Portfolio_test_'+Date.now();
 await mongoose.connect('mongodb://127.0.0.1:27017/'+db,{serverSelectionTimeoutMS:5000});
 const server=app.listen(0);await new Promise(r=>server.listening?r():server.once('listening',r));
 const base='http://127.0.0.1:'+server.address().port;
 async function call(path,method='GET',body,token,status=200){const r=await fetch(base+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();assert.equal(r.status,status,JSON.stringify(data));return data}
 try{
 await User.init();await User.create({name:'Admin',email:'admin@test.example',password:'TestPass123',role:'admin'});
 await call('/api/users','POST',{name:'User',email:'user@test.example',password:'TestPass123',role:'admin'});
 const login=async email=>call('/auth/signin','POST',{email,password:'TestPass123'});
 const a=await login('admin@test.example'),u=await login('user@test.example');assert.equal(a.user.role,'admin');assert.equal(u.user.role,'user');
 await call('/auth/signin','POST',{email:'user@test.example',password:'wrong'},null,401);
 for(const kind of ['contacts','projects','qualifications']){
 const p='/api/'+kind;const body={firstname:'Test',lastname:'Record',email:'record@test.example',title:'Test title',completion:'2026-01-01',description:'Test description',message:'Test message',contactNumber:'5550100'};
 await call(p,'GET',null,null,401);await call(p,'POST',body,u.token,403);
 const row=await call(p,'POST',body,a.token,201);const id=p+'/'+row._id;
 assert.equal((await call(id,'GET',null,u.token)).firstname,'Test');assert.equal((await call(p,'GET',null,u.token)).length,1);
 await call(id,'PUT',{firstname:'Changed'},u.token,403);await call(id,'DELETE',null,u.token,403);await call(p,'DELETE',null,u.token,403);
 await call(id,'PUT',{firstname:'Changed'},a.token);assert.equal((await call(id,'GET',null,a.token)).firstname,'Changed');await call(id,'DELETE',null,a.token);await call(id,'GET',null,a.token,404);
 }
 await call('/auth/signout');
 }finally{server.close();await mongoose.connection.dropDatabase();await mongoose.disconnect()}
});
