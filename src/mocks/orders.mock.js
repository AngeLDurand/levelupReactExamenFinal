export const ordersMock = [
  {
    id: 42,
    estado: "PAGADO",
    fecha: "2025-12-05T12:30:00Z",
    total: 1299990,
    shippingAddress: "caadad, Valparaíso",
    userEmail: "seba@gmail.com",
    items: [
      {
        productId: 1,
        nombre: "OMEN 16-am0018la",
        imagen_url:
          "https://levelup-gamer-assets-prod.s3.us-east-1.amazonaws.com/OMEN+16-am0018la.webp",
        cantidad: 1,
        precioUnitario: 1299990,
      },
    ],
  },
  {
    id: 43,
    estado: "PAGADO",
    fecha: "2025-12-06T10:10:00Z",
    total: 299990,
    shippingAddress: "Santiago, Región Metropolitana",
    userEmail: "a@gmail.com",
    items: [
      {
        productId: 10,
        nombre: "Nintendo Switch Neon",
        imagen_url:
          "https://levelup-gamer-assets-prod.s3.us-east-1.amazonaws.com/Nintendo+Switch+Neon.webp",
        cantidad: 1,
        precioUnitario: 299990,
      },
    ],
  },
];
