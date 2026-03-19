import { motion } from "framer-motion";
import { Trash2, CreditCard, Lock, ShoppingCart, User, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";

const initialCartItems = [
  {
    id: 1,
    title: "Cyberpunk 2077: Ultimate Edition",
    type: "Digital Key",
    platform: "Windows PC",
    price: 59.99,
    image: game1,
  },
  {
    id: 2,
    title: "Elden Ring: Shadow of the Erdtree",
    type: "Expansion",
    platform: "Windows PC",
    price: 39.99,
    image: game2,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "paypal">("credit");
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.0825;
  const discount = -5.0;
  const total = subtotal + tax + discount;

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold tracking-tight">NEXUS</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {["Store", "Library", "Community"].map((item) => (
                <Link
                  key={item}
                  to={item === "Store" ? "/discover" : "#"}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative rounded-lg p-2 text-foreground transition-colors hover:bg-muted">
              <ShoppingCart className="h-4 w-4" />
              {cartItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/profile" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <motion.h1
          className="mb-8 text-3xl font-semibold text-foreground"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Review Your Cart
        </motion.h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="space-y-0 divide-y divide-border">
            {cartItems.map((item, i) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-5 py-6 first:pt-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.type} · {item.platform}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-2 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </button>
                </div>
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  ${item.price.toFixed(2)}
                </span>
              </motion.div>
            ))}
            {cartItems.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">Your cart is empty</p>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            className="rounded-xl bg-card p-6 card-surface h-fit"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="tabular-nums text-foreground">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="tabular-nums text-[hsl(var(--success))]">-${Math.abs(discount).toFixed(2)}</span>
              </div>
              <div className="my-3 h-px bg-border" />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold tabular-nums text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-5 flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code"
                className="flex-1 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                Apply
              </button>
            </div>

            {/* Purchase Button */}
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]">
              Complete Purchase
              <Lock className="h-3.5 w-3.5" />
            </button>

            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              By clicking "Complete Purchase", you agree to the{" "}
              <a href="#" className="text-primary hover:underline">Game Vault Terms of Service</a> and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </motion.div>
        </div>

        {/* Payment Method */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Payment Method</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod("credit")}
              className={`flex flex-1 items-center gap-4 rounded-xl border-2 p-5 transition-all ${
                paymentMethod === "credit"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <CreditCard className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Credit Card</p>
                <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
              </div>
              <div className="ml-auto">
                <div
                  className={`h-4 w-4 rounded-full border-2 ${
                    paymentMethod === "credit"
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {paymentMethod === "credit" && (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`flex flex-1 items-center gap-4 rounded-xl border-2 p-5 transition-all ${
                paymentMethod === "paypal"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded bg-muted text-xs font-bold text-muted-foreground">P</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">PayPal</p>
                <p className="text-xs text-muted-foreground">Checkout faster</p>
              </div>
              <div className="ml-auto">
                <div
                  className={`h-4 w-4 rounded-full border-2 ${
                    paymentMethod === "paypal"
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {paymentMethod === "paypal" && (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2024 Game Vault Storefront. All rights reserved.
      </footer>
    </div>
  );
};

export default Cart;
