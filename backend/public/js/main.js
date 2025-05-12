// Header Functions
async function loadHeader() {
    try {
    const res = await fetch('./header.html');
    const html = await res.text();
    document.getElementById('header').innerHTML = html;

    // Rebind toggle function after HTML is loaded
    window.toggleDropdown = function () {
        document.getElementById('menu').classList.toggle('open');
    };
    } catch (error) {
    console.error('Failed to load header:', error);
    }
}
function toggleDropdown() {
    document.getElementById('menu').classList.toggle('open');
  }
