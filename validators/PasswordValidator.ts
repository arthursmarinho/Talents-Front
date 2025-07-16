import z from "zod";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter ao menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter ao menos um número")
    .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
});

const passwordRequirements = [
  {
    label: "Mínimo de 8 caracteres",
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: "Ao menos 1 letra maiúscula",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "Ao menos 1 letra minúscula",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: "Ao menos 1 número",
    test: (pw: string) => /[0-9]/.test(pw),
  },
  {
    label: "Ao menos 1 caractere especial",
    test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
  },
];

export { schema, passwordRequirements };
