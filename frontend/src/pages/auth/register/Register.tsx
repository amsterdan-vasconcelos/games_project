import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../../../assets/logo.svg';
import { Button } from '../../../components/ui/button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card/Card';
import { Input } from '../../../components/ui/input/Input';
import { Label } from '../../../components/ui/label/Label';
import style from './Register.module.css';
import { useUser } from '../../../hooks/useUser';

export const Register = () => {
  const [full_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const { register } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!full_name || !email || !password || !confirm_password) {
      toast.error('You must fill in all fields!');
      return;
    } else if (password !== confirm_password) {
      toast.error('The password must be the same');
      return;
    }

    register({ full_name, email, password, confirm_password });
  };

  return (
    <div className={style.register}>
      <Card variant='auth'>
        <ToastContainer position='top-right' autoClose={3000} />
        <div className={style.logo}>
          <img src={Logo} alt='Game List' />
        </div>
        <CardHeader>
          <div className={style.cardheader}>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Register yourself to access the system
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.content}>
              <Label htmlFor='full_name'>Full Name</Label>
              <Input
                id='full_name'
                variant='squared'
                type='text'
                placeholder='Enter your name'
                value={full_name}
                style={{ width: 'auto' }}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.content}>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                variant='squared'
                type='email'
                placeholder='Enter your email'
                value={email}
                style={{ width: 'auto' }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={style.content}>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                variant='squared'
                placeholder='Enter your password'
                value={password}
                style={{ width: 'auto' }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={style.content}>
              <Label htmlFor='password'>Confirm Password</Label>
              <Input
                id='confirm_password'
                type='password'
                variant='squared'
                placeholder='Confirm your password'
                value={confirm_password}
                style={{ width: 'auto' }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type='submit' variant='turquoise' className={style.btnsign}>
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className={style.footer}>
          <span>
            Already have an account? <Link to='/login'>Login now</Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
