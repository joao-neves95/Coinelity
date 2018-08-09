page();

page('/dashboard', () => {
  NavbarController._.activateItem('dashboard');
  console.info('Dashboard page.');
});

page('/trade-room', () => {
  console.info('Trade Room page.');
  throw new Error('Route "/trade-room" not yet implemented.')
});

page('/settings', () => {
  console.info('Settings page.');
  throw new Error('Route "/settings" not yet implemented.')
});
