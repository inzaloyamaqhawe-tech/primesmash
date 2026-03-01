const menuItems = [
  { id: 'breakfast-bun', category: 'Smash A Breakfast', name: 'Breakfast Bun', price: 50.0, desc: 'Toasted brioche bun, smokey bacon, egg, American cheese and grilled onions.' },
  { id: 'pulled-beef-breakfast-bun', category: 'Smash A Breakfast', name: 'Pulled Beef Breakfast Bun', price: 60.0, desc: 'Toasted brioche bun, pulled beef, egg, American cheese and grilled onions.' },
  { id: 'breakfast-burger', category: 'Smash A Breakfast', name: 'Breakfast Burger', price: 70.0, desc: 'Toasted brioche bun, 80g smashed prime beef, egg, American cheese and grilled onions.' },
  { id: 'jnr-prime', category: 'Smash Burgers', name: 'Jnr Prime', price: 65.0, desc: 'Toasted brioche bun, 1x 80g smashed prime beef, 1x American cheese, grilled onions, smash sauce and pickled cucumber.' },
  { id: 'the-prime', category: 'Smash Burgers', name: 'The Prime', price: 85.0, desc: 'Toasted brioche bun, 2x 80g smashed prime beef, double American cheese, grilled onions, smash sauce and pickled cucumber.' },
  { id: 'jalapeno-cheese', category: 'Smash Burgers', name: 'Jalapeno & Cheese', price: 90.0, desc: 'Toasted brioche bun, 2x 80g smashed prime beef, double American cheese, grilled onions, smash sauce and pickled jalapenos.' },
  { id: 'bacon-cheese', category: 'Smash Burgers', name: 'Bacon and Cheese', price: 100.0, desc: 'Toasted brioche bun, 2x 80g smashed prime beef, bacon, double American cheese, grilled onions, smash sauce and pickled cucumber.' },
  { id: 'alpha-prime', category: 'Smash Burgers', name: 'Alpha Prime', price: 120.0, desc: 'Toasted brioche bun, 3x 80g smashed prime beef, triple American cheese, grilled onions, smash sauce and pickled cucumber.' },
  { id: 'prime-coffee', category: 'Hot Drinks', name: 'Prime Coffee (Smash Favourite)', price: 30.0, desc: 'Espresso + condensed milk + barista milk + chocolate micro foam.' },
  { id: 'espresso', category: 'Hot Drinks', name: 'Espresso', price: 25.0, desc: 'Hot espresso shot.' },
  { id: 'americano', category: 'Hot Drinks', name: 'Americano', price: 25.0, desc: 'Hot Americano coffee.' },
  { id: 'cappuccino', category: 'Hot Drinks', name: 'Cappuccino', price: 30.0, desc: 'Classic cappuccino.' },
  { id: 'flat-white', category: 'Hot Drinks', name: 'Flat White', price: 30.0, desc: 'Smooth flat white coffee.' },
  { id: 'cafe-latte', category: 'Hot Drinks', name: 'Cafe Latte', price: 30.0, desc: 'Creamy cafe latte.' },
  { id: 'cortado', category: 'Hot Drinks', name: 'Cortado', price: 30.0, desc: 'Balanced espresso and milk.' },
  { id: 'cafe-mocha', category: 'Hot Drinks', name: 'Cafe Mocha', price: 35.0, desc: 'Chocolate-flavored coffee.' },
  { id: 'hot-chocolate', category: 'Hot Drinks', name: 'Hot Chocolate', price: 30.0, desc: 'Rich hot chocolate.' },
  { id: 'chai-latte', category: 'Hot Drinks', name: 'Chai Latte', price: 25.0, desc: 'Spiced chai latte.' },
  { id: 'dirty-chai', category: 'Hot Drinks', name: 'Dirty Chai', price: 30.0, desc: 'Chai with espresso.' },
  { id: 'rooibos-espresso', category: 'Hot Drinks', name: 'Rooibos Espresso', price: 25.0, desc: 'Rooibos espresso style drink.' },
  { id: 'rooibos-latte', category: 'Hot Drinks', name: 'Rooibos Latte', price: 35.0, desc: 'Rooibos latte.' },
  { id: 'condensed-milk', category: 'Hot Drinks', name: 'Condensed Milk', price: 10.0, desc: 'Add condensed milk.' },
  { id: 'soft-drinks', category: 'Cold Drinks', name: 'Soft Drinks', price: 20.0, desc: 'Assorted soft drink options.' },
  { id: 'water', category: 'Cold Drinks', name: 'Water', price: 15.0, desc: 'Bottled water.' },
  { id: 'fruit-juice', category: 'Cold Drinks', name: 'Fruit Juice', price: 20.0, desc: 'Refreshing fruit juice.' },
  { id: 'chocolate-mousse-cake', category: 'Dessert', name: 'Chocolate Mousse Cake', price: 35.0, desc: 'Rich chocolate mousse cake.' },
  { id: 'ice-cream', category: 'Dessert', name: 'Ice cream', price: 25.0, desc: 'Creamy ice cream.' },
  { id: 'mini-chocolate-smash', category: 'Dessert', name: "Mini's Chocolate Smash", price: 30.0, desc: 'Mini chocolate smash dessert.' },
  { id: 'rustic-fries', category: 'Extras', name: 'Rustic Fries', price: 20.0, desc: 'Add-on fries to top up your order.' },
  { id: 'chicken-bites-chips', category: 'Extras', name: 'Chicken Bites + Chips', price: 65.0, desc: 'Add-on side combo of chicken bites and chips.' },
  { id: 'smashed-beef-80g', category: 'Extras', name: '80g Smashed Beef', price: 25.0, desc: 'Add-on extra 80g smashed beef patty.' },
  { id: 'smokey-bacon', category: 'Extras', name: 'Smokey Bacon', price: 10.0, desc: 'Add-on smokey bacon.' },
  { id: 'american-cheese', category: 'Extras', name: 'American Cheese', price: 10.0, desc: 'Add-on American cheese.' }
];

const orderMap = new Map();
const formatMoney = (amount) => `R ${Number(amount).toFixed(2)}`;
const INITIAL_MENU_VISIBLE = 8;
let showFullMenu = false;

function updateYear() {
  document.querySelectorAll('#year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function buildMenu() {
  const menuGrid = document.getElementById('menuGrid');
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  if (!menuGrid) return;

  const renderMenu = () => {
    const visibleItems = showFullMenu ? menuItems : menuItems.slice(0, INITIAL_MENU_VISIBLE);
    menuGrid.innerHTML = '';

    visibleItems.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'menu-item';
      const qty = orderMap.get(item.id) || 0;
      const addOnTag = item.category === 'Extras' ? '<span class="menu-addon">Add-on</span>' : '';
      card.innerHTML = `
        <div class="menu-meta">
          <span class="menu-category">${item.category}</span>
          ${addOnTag}
        </div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="price-row">
          <span class="price">${formatMoney(item.price)}</span>
          <div class="qty">
            <button type="button" data-act="dec" data-id="${item.id}">-</button>
            <strong id="qty-${item.id}">${qty}</strong>
            <button type="button" data-act="inc" data-id="${item.id}">+</button>
          </div>
        </div>
      `;
      menuGrid.appendChild(card);
    });

    if (menuToggleBtn) {
      menuToggleBtn.style.display = menuItems.length > INITIAL_MENU_VISIBLE ? 'inline-flex' : 'none';
      menuToggleBtn.textContent = showFullMenu ? 'Show Less Menu' : 'See More Menu';
    }
  };

  renderMenu();

  menuGrid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-id]');
    if (!button) return;

    const itemId = button.getAttribute('data-id');
    const action = button.getAttribute('data-act');
    const current = orderMap.get(itemId) || 0;
    const next = action === 'inc' ? current + 1 : Math.max(0, current - 1);

    if (next === 0) orderMap.delete(itemId);
    else orderMap.set(itemId, next);

    renderMenu();
    renderSummary();
  });

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      showFullMenu = !showFullMenu;
      renderMenu();
    });
  }
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
      const itemLabel = item.category === 'Extras' ? `${item.name} (Add-on)` : item.name;
      return `<div class="summary-line"><span>${itemLabel} x ${item.qty}</span><strong>${formatMoney(lineTotal)}</strong></div>`;
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
      const itemLabel = item.category === 'Extras' ? `${item.name} (Add-on)` : item.name;
      return `- ${itemLabel} x ${item.qty} = ${formatMoney(lineTotal)}`;
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
