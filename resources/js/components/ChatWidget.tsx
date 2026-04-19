import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, IconButton, Typography, TextField, Avatar, Fab, Badge, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: 'assistant', content: 'مرحباً بكم في مائدة الشيف! أنا سما، مساعدتكم الذكية. كيف يمكنني خدمتكم اليوم؟' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: userMsg });
      setChatHistory(prev => [...prev, { role: 'assistant', content: response.data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Box sx={{ position: 'fixed', bottom: 30, left: 30, zIndex: 1000 }}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
            >
              <Fab 
                onClick={() => setIsOpen(true)}
                sx={{ 
                  bgcolor: '#C9A84C', 
                  color: '#0A0A0A',
                  width: 70, height: 70,
                  boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)',
                  '&:hover': { bgcolor: '#E2C97E' }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Typography variant="caption" sx={{ position: 'absolute', top: -45, right: -20, whiteSpace: 'nowrap', bgcolor: '#111', color: '#C9A84C', px: 1, borderRadius: 1, border: '1px solid #C9A84C', fontSize: '0.7rem' }}>
                    سما 🌟
                  </Typography>
                  <SmartToyIcon />
                </Box>
              </Fab>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <Box sx={{ 
            position: 'fixed', bottom: 30, left: 30, zIndex: 1001,
            width: { xs: 'calc(100% - 60px)', sm: 380 },
            height: { xs: '70vh', sm: 600 }
          }}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Paper sx={{ 
                height: { xs: '70vh', sm: 600 }, 
                display: 'flex', flexDirection: 'column', 
                overflow: 'hidden', bgcolor: '#111', 
                border: '1px solid rgba(201, 168, 76, 0.3)',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                {/* Header */}
                <Box sx={{ p: 2, bgcolor: '#1A1A1A', borderBottom: '1px solid rgba(201, 168, 76, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#C9A84C', color: '#0A0A0A' }}>س</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: '#F5F0E8', fontWeight: 'bold' }}>سما</Typography>
                      <Typography variant="caption" sx={{ color: '#4caf50' }}>• متصل الآن</Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={() => setIsOpen(false)} sx={{ color: '#888' }} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Messages Area */}
                <Box 
                  ref={scrollRef}
                  sx={{ 
                    flexGrow: 1, overflowY: 'auto', p: 2, 
                    display: 'flex', flexDirection: 'column', gap: 2,
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 100%)'
                  }}
                >
                  {chatHistory.map((msg, i) => (
                    <Box key={i} sx={{ 
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%'
                    }}>
                      <Paper sx={{ 
                        p: 1.5, 
                        bgcolor: msg.role === 'user' ? '#C9A84C' : '#222',
                        color: msg.role === 'user' ? '#0A0A0A' : '#F5F0E8',
                        borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                        border: msg.role === 'assistant' ? '1px solid rgba(201, 168, 76, 0.1)' : 'none'
                      }}>
                        <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{msg.content}</Typography>
                      </Paper>
                    </Box>
                  ))}
                  {isLoading && (
                    <Box sx={{ alignSelf: 'flex-start' }}>
                      <CircularProgress size={20} sx={{ color: '#C9A84C' }} />
                    </Box>
                  )}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 2, bgcolor: '#1A1A1A', borderTop: '1px solid rgba(201, 168, 76, 0.1)', display: 'flex', gap: 1 }}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    placeholder="اكتب رسالتك..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    dir="rtl"
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        color: '#F5F0E8', 
                        bgcolor: '#111',
                        borderRadius: 3,
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                        '&:hover fieldset': { borderColor: '#C9A84C' },
                        '&.Mui-focused fieldset': { borderColor: '#C9A84C' }
                      } 
                    }}
                  />
                  <IconButton 
                    onClick={handleSend} 
                    disabled={!message.trim() || isLoading}
                    sx={{ bgcolor: '#C9A84C', color: '#0A0A0A', '&:hover': { bgcolor: '#E2C97E' }, '&.Mui-disabled': { bgcolor: '#333' } }}
                  >
                    <SendIcon sx={{ transform: 'scaleX(-1)' }} />
                  </IconButton>
                </Box>
              </Paper>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
