"use client";

import { Cart, CartItem } from "@/components/creative/cart";

const mockItems: CartItem[] = [
  {
    id: "1",
    name: "Limited Edition Keyboard",
    price: 199.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "2",
    name: "Wireless ANC Headphones",
    price: 249.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
  }
];

export function CartDemo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-8 bg-zinc-950/20 rounded-2xl border border-white/5 backdrop-blur-md">
      <Cart 
        items={mockItems} 
        onCheckout={() => console.log("Checkout clicked")}
      />
    </div>
  );
}
