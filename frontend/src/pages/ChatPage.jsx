import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Send, User, ShieldAlert, CheckCircle2 } from 'lucide-react';
import io from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

const ChatPage = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/payments/order/${orderId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);

        // Fetch existing messages
        const msgRes = await fetch(`${API_BASE_URL}/api/payments/messages/${orderId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMessages(await msgRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrder();
  }, [orderId, user]);

  useEffect(() => {
    if (user) {
      const newSocket = io(API_BASE_URL);
      setSocket(newSocket);

      newSocket.on('connect', () => {
        newSocket.emit('identify', {
          userId: user.id,
          isSeller: user.role === 'seller'
        });
      });

      newSocket.on('receive_message', (message) => {
        if (message.order_id === parseInt(orderId)) {
          setMessages(prev => [...prev, message]);
        }
      });

      return () => newSocket.close();
    }
  }, [user, orderId]);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !order) return;

    const receiver_id = user.id === order.buyer_id ? order.seller_id : order.buyer_id;

    const messageData = {
      order_id: parseInt(orderId),
      sender_id: user.id,
      receiver_id,
      content: newMessage
    };

    socket.emit('send_message', messageData);
    setMessages(prev => [...prev, { ...messageData, id: Date.now(), created_at: new Date() }]);
    setNewMessage('');
  };

  if (loading) return <div className="p-20 text-center">Opening secure chat...</div>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
        {/* Chat Header */}
        <div className="glass-morphism rounded-t-3xl border border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center font-bold">
              {user.id === order.buyer_id ? 'S' : 'B'}
            </div>
            <div>
              <h3 className="font-bold">Secure Transaction Chat</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Order #{orderId}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold uppercase">
              <CheckCircle2 size={14} />
              Payment Verified
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase">
              <ShieldAlert size={14} />
              Secured
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow glass-morphism border-x border-white/10 overflow-y-auto p-6 space-y-6">
          <div className="text-center py-4 px-8 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-500 max-w-lg mx-auto">
            🛡️ NexuHub Escrow: Do not share credentials outside of this chat. The seller will now provide you with the account login details.
          </div>

          <AnimatePresence>
            {messages.map((msg) => {
              const isMine = msg.sender_id === user.id;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: isMine ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-2xl ${
                    isMine
                      ? 'bg-gradient-to-br from-primary to-secondary rounded-tr-none'
                      : 'bg-white/10 rounded-tl-none border border-white/5'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <span className="text-[10px] opacity-50 block mt-2 text-right">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="glass-morphism rounded-b-3xl border border-white/10 p-6">
          <form onSubmit={handleSendMessage} className="relative flex gap-4">
            <input
              type="text"
              className="flex-grow bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-600"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 w-12 bg-accent rounded-xl flex items-center justify-center text-dark hover:scale-105 transition-transform"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
