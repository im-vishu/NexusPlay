import { motion } from "framer-motion";
import {
  LayoutDashboard, Monitor, Users, Settings as SettingsIcon, UserCircle,
  Mail, Lock, Search, Bell, Gamepad2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "@/assets/avatar-profile.jpg";

const sidebarItems = [
  { section: null, items: [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Library", icon: Monitor },
    { name: "Friends", icon: Users },
  ]},
  { section: "PERSONAL", items: [
    { name: "Settings", icon: SettingsIcon, active: true },
    { name: "Profile", icon: UserCircle },
  ]},
];

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [visibility, setVisibility] = useState("friends");
  const [showLibrary, setShowLibrary] = useState(true);
  const [theme, setTheme] = useState("dark");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-border bg-sidebar p-5">
        <Link to="/" className="flex items-center gap-2 text-foreground mb-8">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight">Nexus Play</span>
        </Link>

        {sidebarItems.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-6" : ""}>
            {group.section && (
              <span className="mb-2 block text-metadata text-muted-foreground">{group.section}</span>
            )}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = "active" in item && item.active;
                return (
                  <Link
                    key={item.name}
                    to={item.name === "Profile" ? "/profile" : item.name === "Settings" ? "/settings" : "#"}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}

        <div className="mt-auto flex items-center gap-3 pt-6">
          <img src={avatarImg} alt="Avatar" className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-foreground">ProGamer99</p>
            <p className="text-xs text-muted-foreground">Gold Tier</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-8 py-3 backdrop-blur-xl">
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              <span>Search settings...</span>
            </div>
            <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="max-w-3xl p-8 space-y-10">
          {/* Account */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-semibold text-foreground">Account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Update your security and account details.</p>
            <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Address</p>
                    <p className="text-xs text-muted-foreground">pro.gamer99@example.com</p>
                  </div>
                </div>
                <button className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Change</button>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Password</p>
                    <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">Update</button>
              </div>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            <p className="mt-1 text-sm text-muted-foreground">Control when and how you want to be alerted.</p>
            <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive weekly summaries and friend requests.</p>
                </div>
                <button
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${emailNotif ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${emailNotif ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm font-medium text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Get instant alerts on game invites and rewards.</p>
                </div>
                <button
                  onClick={() => setPushNotif(!pushNotif)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${pushNotif ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${pushNotif ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Privacy */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-semibold text-foreground">Privacy</h2>
            <p className="mt-1 text-sm text-muted-foreground">Decide who can see your profile and activity.</p>
            <div className="mt-4 space-y-4 rounded-xl border border-border bg-card p-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Profile Visibility</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showLibrary}
                  onChange={(e) => setShowLibrary(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-muted accent-primary"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">Show game library to friends</span>
                  <p className="text-xs text-muted-foreground">Allow your friends to see what games you own and play.</p>
                </div>
              </label>
            </div>
          </motion.section>

          {/* Interface */}
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="text-xl font-semibold text-foreground">Interface</h2>
            <p className="mt-1 text-sm text-muted-foreground">Customize your visual experience.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-3 text-sm font-medium text-foreground">Theme Preferences</p>
                <div className="flex gap-3">
                  {["Light", "Dark", "Auto"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t.toLowerCase())}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 transition-all ${
                        theme === t.toLowerCase() ? "border-primary" : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className={`h-8 w-12 rounded ${t === "Light" ? "bg-foreground" : t === "Dark" ? "bg-muted" : "bg-gradient-to-r from-foreground to-muted"}`} />
                      <span className="text-xs text-muted-foreground">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-3 text-sm font-medium text-foreground">Language</p>
                <select className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                  <option>English (United States)</option>
                  <option>Español</option>
                  <option>Français</option>
                </select>
                <p className="mt-2 flex items-center gap-1 text-xs text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Interface language will update immediately.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-8">
            <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
              Reset to Defaults
            </button>
            <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
