'use client';

import { useActionState } from "react";
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginSchema } from './schema';
import { login } from './actions';

export function LoginForm() {
  const [lastResult, action] = useActionState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
  });

  return (
    <form className="flex flex-col gap-5" {...getFormProps(form)} action={action}>
      <div>
        <Label htmlFor="username" >Username</Label>
        <Input {...getInputProps(fields.username, { type: "text" })} />
        <p role='alert' className="text-sm text-destructive">{fields.username.errors}</p>
      </div>
      <div>
        <Label>Password</Label>
        <Input {...getInputProps(fields.password, { type: "password" })} />
        <p role='alert' className="text-sm text-destructive">{fields.password.errors}</p>
      </div>
      <p role='alert' className="text-sm text-destructive">{form.errors}</p>
      <Button className="mt-2">Login</Button>
    </form>
  );
}
