//  let allQuotes = [];
//     const categories = ['wisdom', 'love', 'life', 'inspiration', 'happiness', 'motivation'];

//     // Function to assign random categories to each quote (simulate tags)
//     function assignCategories(quotes) {
//       return quotes.map(quote => {
//         // Assign 1-2 random categories
//         const count = Math.floor(Math.random() * 2) + 1;
//         const shuffled = categories.sort(() => 0.5 - Math.random());
//         quote.tags = shuffled.slice(0, count);
//         return quote;
//       });
//     }

//     // Render category filter buttons
//     function renderCategoryButtons() {
//       const container = document.getElementById('category-buttons');
//       container.innerHTML = '';

//       // "All" button
//       const allBtn = document.createElement('button');
//       allBtn.textContent = 'All';
//       allBtn.className = 'category-btn active';
//       allBtn.dataset.category = 'all';
//       container.appendChild(allBtn);

//       // Buttons for each category
//       categories.forEach(cat => {
//         const btn = document.createElement('button');
//         btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
//         btn.className = 'category-btn';
//         btn.dataset.category = cat;
//         container.appendChild(btn);
//       });

//       // Add click listeners
//       container.querySelectorAll('button').forEach(btn => {
//         btn.addEventListener('click', () => {
//           // Remove active from all buttons
//           container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
//           btn.classList.add('active');

//           const category = btn.dataset.category;
//           if (category === 'all') {
//             renderQuotes(allQuotes);
//           } else {
//             const filtered = allQuotes.filter(q => q.tags.includes(category));
//             renderQuotes(filtered);
//           }
//         });
//       });
//     }

//     // Render quotes list
//     function renderQuotes(quotes) {
//       const quotesList = document.getElementById('quotes-list');
//       quotesList.innerHTML = '';

//       if (quotes.length === 0) {
//         quotesList.innerHTML = '<li>No quotes in this category.</li>';
//         return;
//       }

//       quotes.forEach((quote, index) => {
//         const li = document.createElement('li');
//         li.className = 'quote-item';
//         li.innerHTML = `
//           <blockquote>"${quote.quote}"</blockquote>
//           <p>— ${quote.author}</p>
//           <p class="tags">Tags: ${quote.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</p>
//           <button class="btn-favorite" data-index="${index}">Add to Favorites ★</button>
//         `;
//         quotesList.appendChild(li);
//       });

//       // Add event listeners for favorite buttons
//       document.querySelectorAll('.btn-favorite').forEach(btn => {
//         btn.addEventListener('click', e => {
//           const idx = e.target.getAttribute('data-index');
//           const selectedQuote = quotes[idx];
//           let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//           if (!favorites.some(q => q.text === selectedQuote.quote)) {
//             favorites.push({ text: selectedQuote.quote, author: selectedQuote.author });
//             localStorage.setItem('favorites', JSON.stringify(favorites));
//             alert('Quote added to favorites!');
//           } else {
//             alert('Quote is already in favorites.');
//           }
//         });
//       });
//     }

//     // Save reflection handler
//     function saveReflection() {
//       const reflectionInput = document.getElementById('reflection-input');
//       const reflectionText = reflectionInput.value.trim();
//       const msg = document.getElementById('reflection-msg');
//       if (reflectionText.length === 0) {
//         msg.textContent = 'Please write something before saving.';
//         msg.style.color = 'red';
//         return;
//       }
//       let reflections = JSON.parse(localStorage.getItem('reflections')) || [];
//       reflections.push({ text: reflectionText, date: new Date().toISOString() });
//       localStorage.setItem('reflections', JSON.stringify(reflections));
//       reflectionInput.value = '';
//       msg.textContent = 'Reflection saved!';
//       msg.style.color = 'green';
//     }

//     // Fetch quotes and initialize
//     async function fetchQuotes() {
//       try {
//         const res = await fetch('https://dummyjson.com/quotes?limit=100');
//         const data = await res.json();
//         allQuotes = assignCategories(data.quotes);
//         renderCategoryButtons();
//         renderQuotes(allQuotes);
//       } catch (error) {
//         document.getElementById('quotes-list').innerHTML = '<li>Failed to load quotes. Please try again later.</li>';
//         console.error('Error fetching quotes:', error);
//       }
//     }

//     document.addEventListener('DOMContentLoaded', () => {
//       fetchQuotes();
//       document.getElementById('btn-save-reflection').addEventListener('click', saveReflection);
//     });