import { useState } from 'react';
import '../styles/FAQ.css'
// Savollar va javoblar ro'yxati
const faqData = [
  {
    question: "Flashcard nima?",
    answer: "Flashcard — bu ikki tomonlama kartochka bo'lib, bir tomonida biror savol yoki so'z, boshqa tomonida esa javob yoki tushuntirish bo'ladi. Flashcard'lar ko'pincha o'rganish va eslab qolish uchun ishlatiladi. Masalan, til o'rganishda yangi so'zlarni yoki grammatika qoidalarini o'rganishda flashcard'lardan foydalanish juda foydali bo'ladi."
  },
  {
    question: "Flashcard qanday yaratiladi?",
    answer: "Flashcard yaratish uchun avval pastagi Mavzu qo'shish tugmasini bosib mavzu yaratib olasiz. Uning ichiga kirib Flashcard qo'shish tugmasini bosib flashcard yaratib olasiz."
  },
  {
    question: "Mavzu qo'shish nimaga kerak?",
    answer: "Flashcardlarni bo'limlarga bo'lish uchun mavzular yaratiladi."
  },
  {
    question: "Flashcardlardagi To'g'ri va Xato tugmalari nimaga kerak?",
    answer: "Bu flashcardni bir tomonini ko'rib ikkinchi tomonini taxmin qilganda agar to'g'ri o'ylagan bo'lsangiz to'g'ri tugmasini bosasiz. Agar xato o'ylagan bo'lsangiz xato tugmasini bosasiz"
  },
  {
    question: "Flashcard 100 ball ga yetsa nima bo'ladi?",
    answer: "Agar flashcard 100 ball ga yetgan bo'lsa flashcard yodlangan deb belgilanadi va yuqoridagi yod olganlarlar bo'limiga tushadi."
  },
  {
    question: "Flashcardning yodlangandeb belgilanishi qanday?",
    answer: "Agar flashcard yodlangan deb belgilangan bo'lsa uni o'chirib tahrilab va aylantarib bo'lmaydi."
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index); 
    }
  };

  return (
    <div className="faq-container">
      <h1>Tez-tez so'raladigan savollar (FAQ)</h1>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div 
              className="faq-question" 
              onClick={() => toggleAnswer(index)}
            >
              {item.question}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
