"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartProps {
  items: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  trigger?: React.ReactNode;
}

export function Cart({ items: initialItems, onUpdateQuantity, onRemoveItem, onCheckout, trigger }: CartProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    onUpdateQuantity?.(id, newQuantity);
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    onRemoveItem?.(id);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                {items.length}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-zinc-950/95 border-l border-white/10 backdrop-blur-xl flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-white/5">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="w-5 h-5 text-indigo-400" />
            Your Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
              <ShoppingCart className="w-12 h-12 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-sm line-clamp-2 text-zinc-200">{item.name}</h4>
                    <span className="font-bold text-sm text-indigo-400 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/10 p-1">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors"
                      >
                        <Minus className="w-3 h-3 text-zinc-400" />
                      </button>
                      <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors"
                      >
                        <Plus className="w-3 h-3 text-zinc-400" />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-black/40">
            <div className="flex justify-between mb-4 text-sm text-zinc-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 font-bold text-lg text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl text-base transition-all active:scale-[0.98]"
              onClick={onCheckout}
            >
              Checkout Now
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
