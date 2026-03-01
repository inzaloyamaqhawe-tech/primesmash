const menuItems = [
  { id: 'smash-single', name: 'Classic Smash Burger', price: 79.0, desc: 'Single patty smash burger with house sauce.' },
  { id: 'smash-double', name: 'Double Smash Burger', price: 109.0, desc: 'Double patty smash burger, cheese and pickles.' },
  { id: 'chips-loaded', name: 'Loaded Chips', price: 59.0, desc: 'Crispy chips loaded with signature toppings.' },
  { id: 'combo-regular', name: 'Regular Combo', price: 139.0, desc: 'Burger + chips + drink combo.' },
  { id: 'kids-box', name: 'Kids Box', price: 69.0, desc: 'Mini burger, chips and juice box.' },
  { id: 'cold-drink', name: 'Cold Drink', price: 25.0, desc: 'Choice of canned cooldrink.' }
];

const orderMap = new Map();
const formatMoney = (amount) => `R ${Number(amount).toFixed(2)}`;

function updateYear() {
  document.querySelectorAll('#year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function buildMenu() {
  const menuGrid = document.getElementById('menuGrid');
  if (!menuGrid) return;

  menuItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'menu-item';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="price-row">
        <span class="price">${formatMoney(item.price)}</span>
        <div class="qty">
          <button type="button" data-act="dec" data-id="${item.id}">-</button>
          <strong id="qty-${item.id}">0</strong>
          <button type="button" data-act="inc" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });

  menuGrid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-id]');
    if (!button) return;

    const itemId = button.getAttribute('data-id');
    const action = button.getAttribute('data-act');
    const current = orderMap.get(itemId) || 0;
    const next = action === 'inc' ? current + 1 : Math.max(0, current - 1);

    if (next === 0) orderMap.delete(itemId);
    else orderMap.set(itemId, next);

    const qtyEl = document.getElementById(`qty-${itemId}`);
    if (qtyEl) qtyEl.textContent = String(next);

    renderSummary();
  });
}

function getSelectedItems() {
  return menuItems
    .map((item) => ({ ...item, qty: orderMap.get(item.id) || 0 }))
    .filter((item) => item.qty > 0);
}

function renderSummary() {
  const summaryItems = document.getElementById('summaryItems');
  const summaryTotal = document.getElementById('summaryTotal');
  if (!summaryItems || !summaryTotal) return;

  const selected = getSelectedItems();

  if (!selected.length) {
    summaryItems.innerHTML = '<p>No items selected yet.</p>';
    summaryTotal.textContent = formatMoney(0);
    return;
  }

  let total = 0;
  summaryItems.innerHTML = selected
    .map((item) => {
      const lineTotal = item.qty * item.price;
      total += lineTotal;
      return `<div class="summary-line"><span>${item.name} x ${item.qty}</span><strong>${formatMoney(lineTotal)}</strong></div>`;
    })
    .join('');

  summaryTotal.textContent = formatMoney(total);
}

function setupOrderSubmit() {
  const form = document.getElementById('orderForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const selected = getSelectedItems();
    if (!selected.length) {
      window.alert('Please add at least one item before sending your order.');
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const date = String(data.get('date') || '').trim();
    const time = String(data.get('time') || '').trim();
    const notes = String(data.get('notes') || '').trim();

    let total = 0;
    const lines = selected.map((item) => {
      const lineTotal = item.qty * item.price;
      total += lineTotal;
      return `- ${item.name} x ${item.qty} = ${formatMoney(lineTotal)}`;
    });

    const message = [
      'Hi Prime Smash, I would like to place an order:',
      '',
      ...lines,
      '',
      `Total: ${formatMoney(total)}`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Pickup date: ${date}`,
      `Pickup time: ${time}`,
      notes ? `Notes: ${notes}` : null
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/276603290?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

updateYear();
buildMenu();
renderSummary();
setupOrderSubmit();
