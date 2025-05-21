describe('Eklipse Site Tests', () => {
  const baseUrl = 'https://eklipse.gg'
  const appUrl = 'https://app.eklipse.gg/home'
  const email = 'tbmbone@gmail.com'
  const password = 'Y9GLnCtyUg.6b4a'

  it('TC-LP-01 - Verify Landing Page Default Loading', () => {
    cy.visit(baseUrl)
    cy.wait(2000)

    // Check Logo is visible
    cy.get('header img[src*="Eklipse-Logo"]').should('be.visible')

    // Check CTA buttons
    cy.get('a:contains("Sign In")').should('be.visible')

    // Check Japanese flag
    cy.get('img[src*="flags/jp.png"]').should('be.visible')

    // Check Premium/submenu buttons
    cy.get('a:contains("Premium")').should('exist')
  })

  it('TC-AU-01 - User Login with Email and Password', () => {
    cy.visit(baseUrl);

    // Click "Login" button on the landing page which navigates to app.eklipse.gg/login
    cy.get('a.btn.btn-login:visible', { timeout: 10000 }).click();
    cy.origin('https://app.eklipse.gg', { args: { email, password } }, ({ email, password }) => {

      cy.get('input#username[type="text"]').type(email);
      cy.get('input[type="password"]').type(password);

      // Click the "Sign In" button
      cy.get('button[type="submit"].btn.btn-primary.special.w-100:contains("Sign In"):visible').click();

      // Validate redirection to home page
      cy.url({ timeout: 10000 }).should('include', '/home');

      // Confirm the main logo is visible on the homepage
      cy.get('img.logo-main[alt="logo"]:visible', { timeout: 10000 }).should('be.visible');
    });
  });
});
