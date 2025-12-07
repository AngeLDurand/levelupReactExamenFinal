export const usersMock = [
  // Usuario admin
  {
    id: 1,
    correo: "admin@levelup.com",
    clave: "$2a$10$ABCDEFG12345678900000xxxxx", // hash falso
    nombre: "Administrador",
    rol: "ADMIN",
  },

  // Usuarios reales basados en tu tabla SQL
  {
    id: 2,
    correo: "juan2@mail.com",
    clave: "$2a$10$OJojwh....",   // puedes truncar hashes si quieres
    nombre: "juan",
    rol: "USER",
  },
  {
    id: 3,
    correo: "a@gmail.com",
    clave: "$2a$10$nl3lvOD....",
    nombre: "aa",
    rol: "USER",
  },
  {
    id: 4,
    correo: "seba@gmail.com",
    clave: "$2a$10$fAm.po8....",
    nombre: "seba",
    rol: "USER",
  },
  {
    id: 5,
    correo: "juan21@mail.com",
    clave: "$2a$10$8milMqll...",
    nombre: "juan",
    rol: "USER",
  },
  {
    id: 6,
    correo: "angel@gmail.com",
    clave: "$2a$10$5PV/rnS...",
    nombre: "angel",
    rol: "USER",
  },
  {
    id: 7,
    correo: "juan23333@mail.com",
    clave: "$2a$10$sdisia59...",
    nombre: "juan",
    rol: "USER",
  },
  {
    id: 8,
    correo: "d@gmail.com",
    clave: "$2a$10$4/SuWD...",
    nombre: "d",
    rol: "USER",
  },
];
