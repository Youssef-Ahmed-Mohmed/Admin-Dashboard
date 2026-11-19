import { useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import SceneHeader from '../../components/SceneHeader';

const questions = [
  { category: 'Workspace', question: 'How do I invite someone to the workspace?', answer: 'Open Manage Team and choose Add member. Enter their details, select the access role they need, then submit the invitation form.' },
  { category: 'Workspace', question: 'Can I change a team member’s access level?', answer: 'Yes. Access levels are managed from the team directory. Choose the member and assign the role that matches their responsibilities.' },
  { category: 'Billing', question: 'Where can I review invoice status?', answer: 'The Invoices page lists billing records and their current status. Use search to find a customer, invoice number, or issue date.' },
  { category: 'Billing', question: 'Which currencies are supported?', answer: 'Invoice amounts in this workspace are displayed in USD.' },
  { category: 'Account', question: 'How do I update my contact details?', answer: 'Open Profile Form, edit your personal information, then submit the form to review your updated details.' },
  { category: 'Account', question: 'How can I switch between dark and light themes?', answer: 'Use the theme control in the top bar. Your choice applies across the dashboard while the application is open.' },
];

const categories = ['All topics', 'Workspace', 'Billing', 'Account'];

const FAQ = () => {
  const theme = useTheme();
  const [category, setCategory] = useState('All topics');
  const filtered = useMemo(() => category === 'All topics' ? questions : questions.filter((item) => item.category === category), [category]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: 'auto' }}>
      <SceneHeader title="Help center" subtitle="Quick answers to common workspace questions." />
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
        {categories.map((item) => <Chip key={item} label={item} onClick={() => setCategory(item)} color={category === item ? 'primary' : 'default'} variant={category === item ? 'filled' : 'outlined'} />)}
      </Box>
      <Stack spacing={1}>
        {filtered.map((item) => (
          <Accordion key={item.question} disableGutters elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '12px !important', '&:before': { display: 'none' }, backgroundImage: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} sx={{ px: 2.25, minHeight: 62 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <HelpOutlineRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                <Box><Typography variant="body2" fontWeight={650}>{item.question}</Typography><Typography variant="caption" color="text.secondary">{item.category}</Typography></Box>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ pl: { xs: 6, sm: 7 }, pr: 3, pt: 0, pb: 2.25 }}>
              <Typography variant="body2" color="text.secondary" lineHeight={1.8}>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
};

export default FAQ;
