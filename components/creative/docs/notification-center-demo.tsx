'use client';

import React, { useState } from 'react';
import { NotificationCenter } from '@/components/creative/notification-center';
import { Download, MessageSquare, Zap } from 'lucide-react';

export function NotificationCenterDemo() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New update available",
      description: "Kinetic UI v2.0 is now available with 50 new components.",
      time: "2 mins ago",
      unread: true,
      icon: <Download className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Jane commented on your post",
      description: "\"This looks absolutely incredible! Great work on the animations.\"",
      time: "1 hour ago",
      unread: true,
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: 3,
      title: "System performance improved",
      description: "We've optimized the physics engine. Your site now runs 20% faster.",
      time: "Yesterday",
      unread: false,
      icon: <Zap className="w-4 h-4" />
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id: string | number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col p-8">
      
      {/* Mock Navbar */}
      <div className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 mb-8">
        <div className="font-bold text-white tracking-widest uppercase text-sm">Dashboard</div>
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20" />
          
          <NotificationCenter 
            notifications={notifications} 
            onMarkAllRead={markAllRead}
            onNotificationClick={handleNotificationClick}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500">
        <p className="max-w-sm">
          Click the bell icon in the mock navbar above to view notifications. Notice the unread indicator and mark-as-read functionality.
        </p>
      </div>

    </div>
  );
}
