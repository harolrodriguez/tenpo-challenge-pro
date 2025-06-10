import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthActions } from '../store/auth.store';
import { performFakeLogin } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Por favor ingresa un email válido.' }),
  password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const { login } = useAuthActions();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await performFakeLogin(data.email, data.password);
      login(response.token);
      toast.success('¡Bienvenido!', {
        description: 'Has iniciado sesión correctamente.',
      });
      navigate('/featured', { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      localStorage.removeItem('tenpo-auth-storage');
      toast.error('Error de inicio de sesión', {
        description: error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md min-w-3xs shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tu correo y contraseña para acceder.
          <br />
          <span className="text-xs text-muted-foreground">
            Prueba con: test@tenpo.cl / password123
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@correo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
