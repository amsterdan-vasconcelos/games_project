import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
import { logo } from '../../../utils/icons';
import { Label } from '../../../components/ui/label/Label';
import { useUser } from '../../../hooks/useUser';
import style from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('You must fill in all fields!');
      return;
    }
    await login({ email, password });
  };
  return (
    <div className={style.login}>
      <ToastContainer position='top-right' autoClose={3000} />
      <Card variant='auth'>
        <div className={style.logo}>
          <img src={logo} alt='Game List' />
        </div>
        <CardHeader>
          <div className={style.cardheader}>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={style.form}>
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
              {error && (
                <span style={{ color: '#fd4760' }}>Check your credentials</span>
              )}
            </div>
            <Button
              type='submit'
              variant='turquoise'
              className={style.btnlogin}>
              LOGIN
            </Button>
          </form>
        </CardContent>
        <CardFooter className={style.footer}>
          <span>
            Don’t have an account? <Link to='/register'>Register now</Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
