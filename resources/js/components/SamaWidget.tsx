import React, { useState, useEffect, useRef } from 'react';
import { Box, Avatar, IconButton, Typography, TextField } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function SamaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'مرحباً بكم في مائدة الشيف. أنا سما، مرافقتكم الذكية. كيف يمكنني مساعدتكم اليوم؟' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', { 
        message: input,
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        className="sama-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Sama"
      >
        {isOpen ? <CloseIcon sx={{ color: '#0A0A0A' }} /> : <SmartToyIcon sx={{ color: '#0A0A0A' }} />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="sama-panel animate-fade-up">
          <div className="sama-panel__header">
            <div className="sama-panel__avatar">
              <SmartToyIcon fontSize="small" />
            </div>
            <div>
              <Typography className="sama-panel__name">سما (Sama)</Typography>
              <Typography className="sama-panel__status">متصلة الآن</Typography>
            </div>
            <IconButton 
              size="small" 
              onClick={() => setIsOpen(false)} 
              sx={{ color: 'var(--text-muted)', marginInlineStart: 'auto' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <div className="sama-panel__messages">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`message ${msg.role === 'user' ? 'message--user' : 'message--assistant'}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="message message--assistant">
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="sama-panel__input-area">
            <textarea
              className="sama-panel__input"
              rows={1}
              placeholder="ارسل رسالة..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <IconButton 
              onClick={handleSend} 
              disabled={!input.trim() || loading}
              sx={{ color: 'var(--gold-mid)', '&:hover': { color: 'var(--gold-bright)' } }}
            >
              <SendIcon fontSize="small" sx={{ transform: 'scaleX(-1)' }} />
            </IconButton>
          </div>
        </div>
      )}

      <style>{`
        .sama-panel__messages {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
