class DashboardTemplates {
  constructor() {
    throw new Error( "You can not instantiate DashboardTemplates (static class)" );
  }

  static page() {
    return `
      <main class="page" id="dashboard-page">
        <h1>DASHBOARD</h1>
      </main>`;
  }
}
