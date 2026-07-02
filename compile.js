const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\sigho diseño';

// Logos vectoriales oficiales de Claro y América Móvil
const LOGO_HEADER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 40" width="130" height="40">
    <circle cx="20" cy="20" r="16" fill="#DA291C" />
    <!-- Brillo característico del sol de Claro -->
    <path d="M12 12 C 16 8, 24 8, 28 12 C 24 10, 16 10, 12 12 Z" fill="#FFFFFF" opacity="0.4" />
    <circle cx="20" cy="20" r="13" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.3" />
    <text x="44" y="28" font-family="'Montserrat', sans-serif" font-weight="800" font-size="25" fill="#DA291C" letter-spacing="-0.5">claro</text>
</svg>
`;

const LOGO_FOOTER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 40" width="250" height="40">
    <!-- Sol de Claro -->
    <circle cx="20" cy="20" r="16" fill="#DA291C" />
    <path d="M12 12 C 16 8, 24 8, 28 12 C 24 10, 16 10, 12 12 Z" fill="#FFFFFF" opacity="0.4" />
    <text x="44" y="28" font-family="'Montserrat', sans-serif" font-weight="800" font-size="25" fill="#FFFFFF" letter-spacing="-0.5">claro</text>
    <!-- Separador -->
    <line x1="118" y1="8" x2="118" y2="32" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
    <!-- América Móvil -->
    <text x="132" y="20" font-family="'Montserrat', sans-serif" font-weight="300" font-size="10" fill="#FFFFFF" letter-spacing="1">AMÉRICA</text>
    <text x="132" y="32" font-family="'Montserrat', sans-serif" font-weight="700" font-size="12" fill="#FFFFFF" letter-spacing="0.5">MÓVIL</text>
</svg>
`;

// Estilos globales de Claro (Basado en el PDF)
const GLOBAL_CSS = `
/* ==========================================================================
   PORTAL DE EMPLEO CLARO - ESTILOS GLOBALES
   ========================================================================== */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap');

:root {
    --claro-rojo: #DA291C;
    --claro-rojo-hover: #b81e13;
    --claro-negro: #1C1C1C;
    --claro-gris-fondo: #F4F6F9;
    --claro-gris-borde: #E0E4E8;
    --claro-gris-texto: #6B7280;
    --claro-gris-oscuro: #374151;
    --claro-blanco: #FFFFFF;
    
    --fuente-titulo: 'Montserrat', sans-serif;
    --fuente-texto: 'Open Sans', sans-serif;
    
    --borde-radio-pill: 50px;
    --borde-radio-card: 16px;
    --transicion: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
    box-sizing: border-box;
}

body {
    font-family: var(--fuente-texto);
    color: var(--claro-negro);
    background-color: var(--claro-blanco);
    line-height: 1.6;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex-grow: 1;
}

/* Tipografía */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--fuente-titulo);
    font-weight: 700;
    margin: 0;
}

p {
    margin: 0;
}

a {
    color: var(--claro-rojo);
    text-decoration: none;
    transition: var(--transicion);
}

a:hover {
    color: var(--claro-rojo-hover);
}

/* Botones */
.btn-primary {
    background-color: var(--claro-rojo) !important;
    color: var(--claro-blanco) !important;
    border: none !important;
    border-radius: var(--borde-radio-pill) !important;
    padding: 12px 30px !important;
    font-family: var(--fuente-titulo) !important;
    font-weight: 700 !important;
    font-size: 0.9rem !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    transition: var(--transicion) !important;
}

.btn-primary:hover {
    background-color: var(--claro-rojo-hover) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(218, 41, 28, 0.3) !important;
}

.btn-secondary {
    background-color: transparent !important;
    color: var(--claro-negro) !important;
    border: 2px solid var(--claro-negro) !important;
    border-radius: var(--borde-radio-pill) !important;
    padding: 10px 28px !important;
    font-family: var(--fuente-titulo) !important;
    font-weight: 700 !important;
    font-size: 0.9rem !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    transition: var(--transicion) !important;
}

.btn-secondary:hover {
    background-color: var(--claro-negro) !important;
    color: var(--claro-blanco) !important;
    transform: translateY(-2px) !important;
}

/* Header */
.claro-header {
    background-color: var(--claro-blanco);
    border-bottom: 1px solid var(--claro-gris-borde);
    position: sticky;
    top: 0;
    z-index: 100;
}

.claro-header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.claro-nav {
    display: flex;
    align-items: center;
    gap: 24px;
}

.claro-nav a {
    color: var(--claro-gris-oscuro) !important;
    font-family: var(--fuente-titulo);
    font-size: 0.9rem;
    font-weight: 600;
    padding: 8px 0;
    position: relative;
}

.claro-nav a:hover {
    color: var(--claro-negro) !important;
}

.claro-nav a.active {
    color: var(--claro-rojo) !important;
}

.claro-nav a.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--claro-rojo);
    border-radius: 2px;
}

.profile-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--claro-rojo);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--claro-blanco);
    cursor: pointer;
    overflow: hidden;
    transition: var(--transicion);
}

.profile-button:hover {
    background-color: var(--claro-rojo-hover);
    transform: scale(1.05);
}

.profile-button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Footer */
.claro-footer {
    background-color: var(--claro-negro);
    color: var(--claro-blanco);
    padding: 40px 24px 20px;
}

.claro-footer-inner {
    max-width: 1200px;
    margin: 0 auto;
}

.claro-footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-wrap: wrap;
    gap: 20px;
}

.claro-footer-social {
    display: flex;
    gap: 16px;
}

.claro-footer-social a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--claro-blanco) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transicion);
}

.claro-footer-social a:hover {
    background-color: var(--claro-rojo);
    transform: translateY(-2px);
}

.claro-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    flex-wrap: wrap;
    gap: 16px;
}

.claro-footer-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.claro-footer-links a {
    color: rgba(255, 255, 255, 0.6) !important;
}

.claro-footer-links a:hover {
    color: var(--claro-blanco) !important;
}

/* Accesibilidad y Chat */
.accessibility-btn {
    position: fixed;
    bottom: 24px;
    left: 24px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #0077C8;
    color: var(--claro-blanco);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    z-index: 99;
    font-size: 1.3rem;
}

.chat-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #FBBF24;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    z-index: 99;
    font-size: 1.3rem;
    transition: var(--transicion);
}

.chat-btn:hover {
    transform: scale(1.05) rotate(5deg);
}

/* Popover de Login */
.profile-menu-container {
    position: relative;
}
.profile-toggle-check {
    display: none;
}
.login-popover {
    display: none;
    position: absolute;
    top: 50px;
    right: 0;
    width: 320px;
    background-color: var(--claro-blanco);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    padding: 24px;
    z-index: 1000;
    border: 1px solid var(--claro-gris-borde);
    text-align: left;
}
/* Flechita del popover */
.popover-arrow {
    position: absolute;
    top: -8px;
    right: 12px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--claro-blanco);
    z-index: 1001;
}
.popover-arrow::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--claro-gris-borde);
    z-index: -1;
}
.profile-toggle-check:checked ~ .login-popover {
    display: block;
}
.form-group-popover {
    margin-bottom: 16px;
}
.form-group-popover label {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: var(--claro-negro);
}
.form-group-popover input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--claro-gris-borde);
    border-radius: 6px;
    font-family: var(--fuente-texto);
    font-size: 0.9rem;
    outline: none;
    background-color: #F8FAFC;
}
.form-group-popover input:focus {
    border-color: var(--claro-rojo);
    background-color: var(--claro-blanco);
}
.popover-buttons {
    display: flex;
    gap: 8px;
    margin-top: 20px;
}
.btn-primary-popover {
    background-color: var(--claro-rojo);
    color: var(--claro-blanco);
    border: none;
    border-radius: var(--borde-radio-pill);
    padding: 10px 16px;
    font-family: var(--fuente-titulo);
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: var(--transicion);
    flex: 1;
}
.btn-primary-popover:hover {
    background-color: var(--claro-rojo-hover);
}
.btn-secondary-popover {
    background-color: var(--claro-blanco);
    color: var(--claro-rojo);
    border: 1.5px solid var(--claro-rojo);
    border-radius: var(--borde-radio-pill);
    padding: 8px 16px;
    font-family: var(--fuente-titulo);
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: var(--transicion);
    flex: 1;
}
.btn-secondary-popover:hover {
    background-color: rgba(218, 41, 28, 0.05);
}

/* Responsive general */
@media (max-width: 768px) {
    .claro-header-inner { padding: 12px 16px; }
    .claro-nav { display: none; } /* En una app real se añadiría menú hamburguesa */
    .claro-footer-top, .claro-footer-bottom { flex-direction: column; text-align: center; }
    .claro-footer-links { justify-content: center; }
}

// Helper para crear el wrapper HTML con Header y Footer estándar
function getLayout(title, content, activeNav, isLogged = false) {
    const activeClass = (nav) => nav === activeNav ? 'class="active"' : '';
    
    // Checkbox hack para el menú flotante en estado deslogueado
    const profileBtn = isLogged 
        ? `<a href="perfil.html" class="profile-button" title="Mi Perfil"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" alt="Vinicio"></a>`
        : `<div class="profile-menu-container">
            <input type="checkbox" id="profile-toggle" class="profile-toggle-check" ${activeNav === 'inicio' ? 'checked' : ''}>
            <label for="profile-toggle" class="profile-button" title="Ingresar" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background-color: var(--claro-rojo); color: var(--claro-blanco); cursor: pointer;">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </label>
            <div class="login-popover">
                <div class="popover-arrow"></div>
                <form action="perfil.html" method="GET">
                    <div class="form-group-popover">
                        <label>Correo Electrónico</label>
                        <input type="email" placeholder="ejemplo@correo.com" required value="vinicio.sanchez@correo.com">
                    </div>
                    <div class="form-group-popover">
                        <label>Contraseña</label>
                        <input type="password" placeholder="****************" required value="contraseña123">
                    </div>
                    <div class="popover-buttons">
                        <button type="submit" class="btn-primary-popover">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 4px; vertical-align: middle;"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            Iniciar sesión
                        </button>
                        <a href="registro.html" class="btn-secondary-popover">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 4px; vertical-align: middle;"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                            Crear Perfil
                        </a>
                    </div>
                </form>
            </div>
        </div>`;

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claro Empleo - ${title}</title>
    <style>
        ${GLOBAL_CSS}
    </style>
</head>
<body>
    <!-- Header -->
    <header class="claro-header">
        <div class="claro-header-inner">
            <div class="claro-logo">
                <a href="index.html">${LOGO_HEADER_SVG}</a>
            </div>
            <nav class="claro-nav">
                <a href="index.html" ${activeClass('inicio')}>Inicio</a>
                <a href="busqueda.html" ${activeClass('vacantes')}>Vacantes</a>
                <a href="cultura.html" ${activeClass('cultura')}>Nuestra Esencia</a>
                <a href="pais.html" ${activeClass('pais')}>Claro en tu País</a>
                <a href="apoyo.html" ${activeClass('apoyo')}>Apoyo al Candidato</a>
            </nav>
            ${profileBtn}
        </div>
    </header>

    <!-- Contenido -->
    <main>
        ${content}
    </main>

    <!-- Footer -->
    <footer class="claro-footer">
        <div class="claro-footer-inner">
            <div class="claro-footer-top">
                <div class="claro-footer-logo">
                    ${LOGO_FOOTER_SVG}
                </div>
                <div class="claro-footer-social">
                    <a href="#">F</a>
                    <a href="#">X</a>
                    <a href="#">I</a>
                    <a href="#">W</a>
                </div>
            </div>
            <div class="claro-footer-bottom">
                <p>Todos los derechos reservados, Claro 2026</p>
                <div class="claro-footer-links">
                    <a href="#">Mapa de sitio</a>
                    <a href="#">Portal de denuncias</a>
                    <a href="#">Privacidad</a>
                    <a href="#">Legal y Regulatorio</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Accesibilidad y Chat -->
    <div class="accessibility-btn" title="Accesibilidad">♿</div>
    <div class="chat-btn" title="Chatear con nosotros">💬</div>
</body>
</html>`;
}

// --------------------------------------------------------------------------------
// 1. GENERAR index.html (Homepage)
// ---------------------------------------------------------------const homeContent = `
<style>
.hero {
    position: relative;
    background: linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 80%), 
                url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80') no-repeat center right/cover;
    padding: 120px 24px 80px;
    color: var(--claro-negro);
    min-height: 520px;
    display: flex;
    align-items: center;
    overflow: hidden;
}
.hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}
.hero-text {
    max-width: 600px;
    text-align: left;
}
.hero-text h1 {
    font-size: 3.5rem;
    line-height: 1.1;
    margin-bottom: 20px;
    font-weight: 800;
    color: var(--claro-negro);
}
.hero-text h1 span {
    color: var(--claro-rojo);
}
.hero-text p.hero-desc {
    font-size: 1.15rem;
    color: var(--claro-gris-oscuro);
    margin-bottom: 32px;
    line-height: 1.5;
    max-width: 500px;
}
.hero-buttons {
    display: flex;
    gap: 16px;
    margin-bottom: 48px;
}
.hero-btn-play {
    background-color: var(--claro-blanco) !important;
    color: var(--claro-negro) !important;
    border: 1px solid var(--claro-gris-oscuro) !important;
    border-radius: var(--borde-radio-pill) !important;
    padding: 12px 28px !important;
    font-family: var(--fuente-titulo) !important;
    font-weight: 700 !important;
    font-size: 0.9rem !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    transition: var(--transicion) !important;
}
.hero-btn-play:hover {
    background-color: var(--claro-gris-fondo) !important;
    transform: translateY(-2px) !important;
}

/* Buscador flotante del Hero */
.search-container-hero {
    background-color: var(--claro-blanco);
    border-radius: var(--borde-radio-pill);
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    padding: 8px 12px 8px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    max-width: 520px;
    border: 1px solid var(--claro-gris-borde);
}
.search-field-group {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    border-right: 1px solid var(--claro-gris-borde);
    position: relative;
}
.search-field-group:nth-child(2) {
    border-right: none;
    padding-left: 8px;
}
.search-field-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--claro-gris-texto);
    margin-right: 4px;
}
.search-field-group select {
    border: none;
    outline: none;
    font-family: var(--fuente-texto);
    font-size: 0.9rem;
    color: var(--claro-negro);
    background: transparent;
    cursor: pointer;
    width: 100%;
    padding: 6px 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.search-field-group::after {
    content: '▼';
    font-size: 0.65rem;
    color: var(--claro-gris-texto);
    position: absolute;
    right: 16px;
    pointer-events: none;
}
.btn-search-hero {
    background-color: var(--claro-rojo) !important;
    color: var(--claro-blanco) !important;
    border: none !important;
    border-radius: var(--borde-radio-pill) !important;
    padding: 10px 24px !important;
    font-family: var(--fuente-titulo) !important;
    font-weight: 700 !important;
    font-size: 0.85rem !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    transition: var(--transicion) !important;
}
.btn-search-hero:hover {
    background-color: var(--claro-rojo-hover) !important;
}

.slider-dots {
    display: flex;
    gap: 8px;
    margin-top: 32px;
}
.slider-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.25);
    cursor: pointer;
    transition: var(--transicion);
}
.slider-dot.active {
    background-color: var(--claro-rojo);
    width: 24px;
    border-radius: 5px;
}

/* Barra roja de pilares */
.red-banner {
    background-color: var(--claro-rojo);
    color: var(--claro-blanco);
    padding: 24px;
}
.red-banner-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
}
.banner-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 24px;
    border-right: 1px solid rgba(255, 255, 255, 0.25);
}
.banner-item:last-child {
    border-right: none;
}
.banner-item-icon {
    font-size: 1.8rem;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.banner-item h4 {
    font-family: var(--fuente-titulo);
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 4px;
}
.banner-item p {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 260px;
}

/* Sección ¿Por qué trabajar en Claro? */
.why-claro {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}
.why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-top: 48px;
}
.why-card {
    background-color: var(--claro-blanco);
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    overflow: hidden;
    transition: var(--transicion);
    border: 1px solid var(--claro-gris-borde);
    text-align: center;
}
.why-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
.why-card-img-container {
    position: relative;
    height: 240px;
    overflow: hidden;
}
.why-card-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.why-card-badge-sol {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 36px;
    height: 36px;
    background-color: var(--claro-rojo);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--claro-blanco);
    font-size: 1.1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.why-card-label-cta {
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--claro-rojo);
    color: var(--claro-blanco);
    padding: 8px 24px;
    border-radius: var(--borde-radio-pill);
    font-family: var(--fuente-titulo);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    white-space: nowrap;
    box-shadow: 0 4px 10px rgba(218, 41, 28, 0.25);
    z-index: 2;
}
.why-card-content {
    padding: 36px 24px 28px;
}
.why-card-content p {
    font-size: 0.9rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.55;
}

/* Sección Video */
.video-section {
    background-color: var(--claro-gris-fondo);
    padding: 80px 24px;
}
.video-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 60px;
    align-items: center;
}
.video-text {
    text-align: left;
}
.video-text h2 {
    font-size: 2.5rem;
    color: var(--claro-negro);
    line-height: 1.2;
    margin-bottom: 16px;
}
.video-text h2 span {
    color: var(--claro-rojo);
}
.video-text p {
    font-size: 1.1rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.6;
}
.video-wrapper-premium {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(0,0,0,0.12);
    aspect-ratio: 16/9;
}
.video-wrapper-premium img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.video-play-btn-black {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: var(--claro-negro);
    color: var(--claro-blanco);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    transition: var(--transicion);
}
.video-play-btn-black:hover {
    background-color: var(--claro-rojo);
    transform: translate(-50%, -50%) scale(1.08);
}

/* Experiencia del Candidato */
.experience-section {
    padding: 80px 24px;
    background-color: var(--claro-blanco);
}
.experience-inner-premium {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 60px;
    align-items: center;
}
.experience-text {
    text-align: left;
}
.experience-text h3.path-subtitle {
    font-size: 0.95rem;
    color: var(--claro-rojo);
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 12px;
}
.experience-text h2 {
    font-size: 2.5rem;
    color: var(--claro-negro);
    margin-bottom: 20px;
}
.experience-text p {
    font-size: 1.05rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.6;
}
.experience-timeline-premium {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    position: relative;
}
.experience-timeline-premium::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    height: 2px;
    background-image: linear-gradient(to right, var(--claro-gris-borde) 50%, rgba(255,255,255,0) 0%);
    background-position: top;
    background-size: 10px 2px;
    background-repeat: repeat-x;
    z-index: 0;
}
.timeline-step-premium {
    text-align: center;
    position: relative;
    z-index: 1;
}
.timeline-icon-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--claro-rojo);
    color: var(--claro-blanco);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 2rem;
    box-shadow: 0 6px 15px rgba(218, 41, 28, 0.2);
}
.timeline-step-premium h4 {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--claro-negro);
}
.timeline-step-premium p {
    font-size: 0.8rem;
    color: var(--claro-gris-texto);
    line-height: 1.5;
    padding: 0 10px;
}

/* CTA Bottom */
.cta-bottom {
    background: linear-gradient(135deg, #a81c12 0%, #DA291C 100%);
    color: var(--claro-blanco);
    padding: 80px 24px;
    position: relative;
    overflow: hidden;
}
.cta-bottom::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0);
    background-size: 24px 24px;
    opacity: 0.8;
}
.cta-bottom-inner-premium {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}
.cta-text-left {
    text-align: left;
}
.cta-text-left h2 {
    font-size: 2.6rem;
    margin-bottom: 12px;
    font-weight: 800;
}
.cta-text-left p {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.9);
}
.cta-buttons-right {
    display: flex;
    gap: 16px;
}
.btn-cta-login {
    background-color: var(--claro-blanco) !important;
    color: var(--claro-rojo) !important;
    border: none !important;
    border-radius: var(--borde-radio-pill) !important;
    padding: 14px 36px !important;
    font-family: var(--fuente-titulo) !important;
    font-weight: 700 !important;
    font-size: 0.9rem !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
    transition: var(--transicion) !important;
}
.btn-cta-login:hover {
    background-color: rgba(255, 255, 255, 0.9) !important;
    transform: translateY(-2px) !important;
}
.btn-cta-register {
    background-color: transparent !important;
    color: var(--claro-blanco) !important;
    border: 2px solid var(--claro-blanco) !important;
    border-radius: var(--borde-radio-pill) !important;
    padding: 12px 34px !important;
    font-family: var(--fuente-titulo) !important;
    font-weight: 700 !important;
    font-size: 0.9rem !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    transition: var(--transicion) !important;
}
.btn-cta-register:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-2px) !important;
}

@media (max-width: 992px) {
    .video-inner, .experience-inner-premium, .cta-bottom-inner-premium { grid-template-columns: 1fr; flex-direction: column; text-align: center; }
    .hero { background: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80') no-repeat center center/cover; padding: 60px 16px; text-align: center; }
    .hero-text { text-align: center; margin: 0 auto; }
    .hero-buttons { justify-content: center; }
    .search-container-hero { flex-direction: column; border-radius: 20px; padding: 16px; margin: 0 auto; max-width: 100%; }
    .search-field-group { border-right: none; border-bottom: 1px solid var(--claro-gris-borde); padding-bottom: 12px; width: 100%; }
    .search-field-group:nth-child(2) { padding-left: 0; }
    .btn-search-hero { width: 100%; margin-top: 8px; }
    .red-banner-inner { grid-template-columns: 1fr; }
    .banner-item { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
    .why-grid { grid-template-columns: 1fr; }
    .experience-timeline-premium { grid-template-columns: 1fr; }
    .experience-timeline-premium::before { display: none; }
    .cta-text-left, .video-text { text-align: center; }
    .cta-buttons-right { justify-content: center; }
}
</style>

<!-- Hero -->
<section class="hero">
    <div class="hero-inner">
        <div class="hero-text">
            <h1>Construye<br>tu futuro en <span>Claro</span></h1>
            <p class="hero-desc">Sé parte de la empresa que conecta personas, tecnología y oportunidades.</p>
            <div class="hero-buttons">
                <a href="busqueda.html" class="btn-primary">Ver Vacantes →</a>
                <a href="cultura.html" class="hero-btn-play">Conoce la experiencia ▶</a>
            </div>
            
            <!-- Buscador flotante dentro del Hero -->
            <div class="search-container-hero">
                <div class="search-field-group">
                    <span class="search-field-label">Cargo</span>
                    <select>
                        <option value="">Selecciona...</option>
                        <option value="IT">IT y Telecomunicaciones</option>
                        <option value="Ventas">Ventas y Marketing</option>
                        <option value="Atencion">Servicio al Cliente</option>
                    </select>
                </div>
                <div class="search-field-group">
                    <span class="search-field-label">País</span>
                    <select>
                        <option value="Honduras" selected>Honduras</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="El Salvador">El Salvador</option>
                    </select>
                </div>
                <a href="busqueda.html" class="btn-search-hero">Buscar</a>
            </div>
            
            <div class="slider-dots">
                <span class="slider-dot active"></span>
                <span class="slider-dot"></span>
                <span class="slider-dot"></span>
                <span class="slider-dot"></span>
            </div>
        </div>
    </div>
</section>

<!-- Barra roja -->
<section class="red-banner">
    <div class="red-banner-inner">
        <div class="banner-item">
            <span class="banner-item-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
            </span>
            <h4>Crecimiento</h4>
            <p>Desarrolla tu talento y llega más lejos</p>
        </div>
        <div class="banner-item">
            <span class="banner-item-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </span>
            <h4>Nuestra Cultura</h4>
            <p>Conoce cómo vivimos la cultura Claro</p>
        </div>
        <div class="banner-item">
            <span class="banner-item-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </span>
            <h4>Beneficios</h4>
            <p>Bienestar integral para ti y tu familia</p>
        </div>
    </div>
</section>

<!-- ¿Por qué trabajar en Claro? -->
<section class="why-claro">
    <div class="section-header">
        <h2>¿Por qué trabajar en <span>Claro</span>?</h2>
    </div>
    
    <div class="why-grid">
        <!-- Tarjeta 1 -->
        <div class="why-card">
            <div class="why-card-img-container">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Crecimiento">
                <!-- Icono de sol flotante arriba a la izquierda -->
                <div class="why-card-badge-sol">☼</div>
                <!-- Caja roja abajo de la imagen -->
                <div class="why-card-label-cta">Impulsamos tu crecimiento</div>
            </div>
            <div class="why-card-content">
                <p>Desarrolla tu talento en una empresa que apuesta por tu aprendizaje, evolución profesional y nuevos retos constantes.</p>
            </div>
        </div>
        
        <!-- Tarjeta 2 -->
        <div class="why-card">
            <div class="why-card-img-container">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" alt="Gran Equipo">
                <div class="why-card-badge-sol">☼</div>
                <div class="why-card-label-cta">Somos un gran equipo</div>
            </div>
            <div class="why-card-content">
                <p>Trabaja en un ambiente colaborativo, inclusivo y enfocado en lograr resultados juntos.</p>
            </div>
        </div>
        
        <!-- Tarjeta 3 -->
        <div class="why-card">
            <div class="why-card-img-container">
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" alt="Beneficios">
                <div class="why-card-badge-sol">☼</div>
                <div class="why-card-label-cta">Beneficios que suman</div>
            </div>
            <div class="why-card-content">
                <p>Disfruta de programas, estabilidad y beneficios diseñados para tu bienestar y el de tu familia.</p>
            </div>
        </div>
    </div>
</section>

<!-- Sección Video -->
<section class="video-section">
    <div class="video-inner">
        <div class="video-text">
            <h2>¡<span>Claro</span> que te estamos buscando!</h2>
            <p>Tu talento puede transformar el futuro: conecta, crece y haz posible un mundo mejor con Claro.</p>
        </div>
        <div class="video-wrapper-premium">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Video">
            <div class="video-play-btn-black" onclick="alert('Simulación: Reproduciendo video corporativo institucional de Claro')">▶</div>
        </div>
    </div>
</section>

<!-- Experiencia del Candidato -->
<section class="experience-section">
    <div class="experience-inner-premium">
        <div class="experience-text">
            <h3 class="path-subtitle">Tu camino en Claro</h3>
            <h2>Experiencia del Candidato</h2>
            <p>Un proceso transparente, ágil y pensado para que tengas una mejor experiencia.</p>
        </div>
        <div class="experience-timeline-premium">
            <div class="timeline-step-premium">
                <div class="timeline-icon-circle">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                </div>
                <h4>1.Postúlate</h4>
                <p>Encuentra la vacante ideal y envía tu postulación en pocos pasos.</p>
            </div>
            <div class="timeline-step-premium">
                <div class="timeline-icon-circle">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h4>2.Descubrimos tu talento</h4>
                <p>Analizamos tu perfil, experiencia y competencias.</p>
            </div>
            <div class="timeline-step-premium">
                <div class="timeline-icon-circle">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <h4>3.Conectamos</h4>
                <p>Conoce a nuestro equipo y conversemos sobre tu futuro.</p>
            </div>
            <div class="timeline-step-premium">
                <div class="timeline-icon-circle">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <h4>4.Comienza tu historia en Claro</h4>
                <p>¡Bienvenido(a) a Claro! Comienza tu nueva etapa profesional.</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Final -->
<section class="cta-bottom">
    <div class="cta-bottom-inner-premium">
        <div class="cta-text-left">
            <h2>Dá el siguiente paso en tu carrera</h2>
            <p>Crea tu perfil y recibe oportunidades que impulsen tu crecimiento profesional.</p>
        </div>
        <div class="cta-buttons-right">
            <label for="profile-toggle" class="btn-cta-login" style="cursor: pointer;">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 6px; vertical-align: middle;"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                Iniciar sesión
            </label>
            <a href="registro.html" class="btn-cta-register">
                Crear Perfil
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-left: 6px; vertical-align: middle;"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>
    </div>
</section>
`;template-columns: 1fr; }
}
</style>

<!-- Hero -->
<section class="hero">
    <div class="hero-inner">
        <div class="hero-text">
            <span style="display:inline-block; background-color:var(--claro-rojo); color:var(--claro-blanco); padding:6px 16px; border-radius:50px; font-weight:700; font-size:0.75rem; text-transform:uppercase; letter-spacing:2px; margin-bottom:24px;">Comunidad de talento</span>
            <h1>Construye<br>tu futuro en <span>Claro</span></h1>
            <p>Sé parte de la empresa que conecta personas, tecnología y oportunidades.</p>
            <div class="hero-buttons">
                <a href="busqueda.html" class="btn-primary">Ver Vacantes →</a>
                <a href="cultura.html" class="btn-primary hero-btn-white-trans">Conoce la experiencia ▶</a>
            </div>
            <div class="slider-dots">
                <span class="slider-dot active"></span>
                <span class="slider-dot"></span>
                <span class="slider-dot"></span>
                <span class="slider-dot"></span>
            </div>
        </div>
        
        <!-- Formulario Login Rápido -->
        <div class="login-box">
            <h3>Iniciar sesión</h3>
            <form action="perfil.html" method="GET">
                <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" placeholder="ejemplo@correo.com" required value="vinicio.sanchez@correo.com">
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" placeholder="••••••••••••" required value="contraseña123">
                </div>
                <div class="login-buttons">
                    <button type="submit" class="btn-primary" style="flex: 1;">Iniciar sesión</button>
                    <a href="registro.html" class="btn-secondary" style="flex: 1; text-align: center;">Crear Perfil</a>
                </div>
            </form>
        </div>
    </div>
</section>

<!-- Buscador flotante -->
<div class="search-floating">
    <div class="search-input-group">
        <span>🔍</span>
        <input type="text" placeholder="Cargo o área de interés...">
    </div>
    <div class="search-input-group">
        <span>📍</span>
        <select>
            <option>Selecciona un país</option>
            <option value="Honduras" selected>Honduras</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Costa Rica">Costa Rica</option>
        </select>
    </div>
    <a href="busqueda.html" class="btn-primary">Buscar</a>
</div>

<!-- Barra roja -->
<section class="red-banner">
    <div class="red-banner-inner">
        <div class="banner-item">
            <span class="banner-item-icon">📈</span>
            <div>
                <h4>Crecimiento</h4>
                <p>Desarrolla tu talento y llega más lejos.</p>
            </div>
        </div>
        <div class="banner-item">
            <span class="banner-item-icon">👥</span>
            <div>
                <h4>Nuestra Cultura</h4>
                <p>Conoce cómo vivimos la cultura Claro.</p>
            </div>
        </div>
        <div class="banner-item">
            <span class="banner-item-icon">❤️</span>
            <div>
                <h4>Beneficios</h4>
                <p>Bienestar integral para ti y tu familia.</p>
            </div>
        </div>
    </div>
</section>

<!-- ¿Por qué trabajar en Claro? -->
<section class="why-claro">
    <div class="section-header">
        <h2>¿Por qué trabajar en <span>Claro</span>?</h2>
    </div>
    
    <div class="why-grid">
        <!-- Tarjeta 1 -->
        <div class="why-card">
            <div class="why-card-img">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Crecimiento">
                <span class="why-card-tag">Impulsamos tu crecimiento</span>
            </div>
            <div class="why-card-content">
                <p>Desarrolla tu talento en una empresa que apuesta por tu aprendizaje, evolución profesional y nuevos retos constantes.</p>
            </div>
        </div>
        <!-- Tarjeta 2 -->
        <div class="why-card">
            <div class="why-card-img">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" alt="Equipo">
                <span class="why-card-tag">Somos un gran equipo</span>
            </div>
            <div class="why-card-content">
                <p>Trabaja en un ambiente colaborativo, inclusivo y enfocado en lograr resultados juntos para conectar al país.</p>
            </div>
        </div>
        <!-- Tarjeta 3 -->
        <div class="why-card">
            <div class="why-card-img">
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" alt="Beneficios">
                <span class="why-card-tag">Beneficios que suman</span>
            </div>
            <div class="why-card-content">
                <p>Disfruta de programas, estabilidad y beneficios diseñados para tu bienestar, el balance de vida y el de tu familia.</p>
            </div>
        </div>
    </div>
</section>

<!-- Sección Video -->
<section class="video-section">
    <div class="video-inner">
        <div class="video-text">
            <h2>¡<span>Claro</span> que te estamos buscando!</h2>
            <p>Tu talento puede transformar el futuro: conecta, crece y haz posible un mundo mejor con Claro.</p>
        </div>
        <div class="video-wrapper">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Video">
            <div class="video-play-btn" onclick="alert('Simulación: Reproducción de video institucional')">▶</div>
        </div>
    </div>
</section>

<!-- Experiencia del Candidato -->
<section class="experience-section">
    <div class="experience-inner">
        <div class="experience-text">
            <span style="font-size:0.9rem; font-weight:700; color:var(--claro-rojo); text-transform:uppercase;">Tu camino en Claro</span>
            <h2 style="font-size:2.4rem; margin:12px 0 20px;">Experiencia del Candidato</h2>
            <p style="color:var(--claro-gris-oscuro); font-size:1.05rem;">Un proceso transparente, ágil y pensado para que tengas una mejor experiencia desde tu primer contacto.</p>
        </div>
        <div class="experience-timeline">
            <div class="timeline-step">
                <div class="timeline-step-icon">📝</div>
                <h4>1. Postúlate</h4>
                <p>Encuentra la vacante ideal y envía tu postulación.</p>
            </div>
            <div class="timeline-step">
                <div class="timeline-step-icon">🔍</div>
                <h4>2. Descubrimos tu talento</h4>
                <p>Analizamos tu perfil, experiencia y competencias.</p>
            </div>
            <div class="timeline-step">
                <div class="timeline-step-icon">📞</div>
                <h4>3. Conectamos</h4>
                <p>Conoce a nuestro equipo y conversemos sobre tu futuro.</p>
            </div>
            <div class="timeline-step">
                <div class="timeline-step-icon">✔️</div>
                <h4>4. Comienza tu historia</h4>
                <p>¡Bienvenido! Comienza tu nueva etapa profesional en Claro.</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Bottom -->
<section class="cta-bottom">
    <div class="cta-bottom-inner">
        <h2>Da el siguiente paso en tu carrera</h2>
        <p>Crea tu perfil y recibe oportunidades que impulsen tu crecimiento profesional.</p>
        <div style="display:flex; justify-content:center; gap:16px;">
            <a href="registro.html" class="btn-primary">Iniciar sesión</a>
            <a href="registro.html" class="btn-secondary">Crear Perfil</a>
        </div>
    </div>
</section>
`;

// --------------------------------------------------------------------------------
// 2. GENERAR busqueda.html (Resultados de Búsqueda y Modal)
// --------------------------------------------------------------------------------
const searchContent = `
<style>
.search-hero {
    position: relative;
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
    padding: 80px 24px;
    color: var(--claro-blanco);
    text-align: center;
}
.search-hero-content {
    max-width: 800px;
    margin: 0 auto;
}
.search-hero h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
}
.search-hero h1 span {
    color: var(--claro-rojo);
}
.search-hero p {
    font-size: 1.15rem;
    margin-bottom: 30px;
}

/* Resultados */
.results-section {
    padding: 60px 24px;
    max-width: 1200px;
    margin: 0 auto;
}
.results-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
}
.results-header h2 {
    font-size: 2.4rem;
    color: var(--claro-negro);
    display: inline-block;
    padding-bottom: 12px;
}
.results-header h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background-color: var(--claro-rojo);
    border-radius: 2px;
}

/* Filtros en botones rojos */
.filter-bar {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 40px;
    flex-wrap: wrap;
}
.filter-dropdown {
    background-color: var(--claro-blanco);
    color: var(--claro-negro);
    border: 1px solid var(--claro-rojo);
    border-radius: var(--borde-radio-pill);
    padding: 10px 24px;
    font-family: var(--fuente-titulo);
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: var(--transicion);
}
.filter-dropdown:hover {
    background-color: rgba(218, 41, 28, 0.05);
}
.filter-dropdown span {
    color: var(--claro-rojo);
}

/* Cuadrícula de Vacantes */
.jobs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;
}
.job-card {
    background-color: var(--claro-blanco);
    border: 1px solid var(--claro-gris-borde);
    border-radius: var(--borde-radio-card);
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
    transition: var(--transicion);
    cursor: pointer;
    position: relative;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.job-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.1);
    border-color: var(--claro-rojo);
}
.job-card.dark-theme {
    background: linear-gradient(135deg, #1C1C1C 0%, #000000 100%);
    color: var(--claro-blanco);
    border: none;
}
.job-card.red-theme {
    background: linear-gradient(135deg, #DA291C 0%, #a81c12 100%);
    color: var(--claro-blanco);
    border: none;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.job-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}
.job-fav-icon {
    font-size: 1.4rem;
    color: var(--claro-gris-texto);
    cursor: pointer;
    transition: var(--transicion);
}
.job-card:hover .job-fav-icon {
    color: var(--claro-rojo);
}
.job-card.dark-theme .job-fav-icon {
    color: rgba(255,255,255,0.4);
}
.job-card.dark-theme:hover .job-fav-icon {
    color: var(--claro-blanco);
}
.job-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 12px;
    line-height: 1.3;
}
.job-meta {
    font-size: 0.82rem;
    color: var(--claro-gris-texto);
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
}
.job-card.dark-theme .job-meta {
    color: rgba(255,255,255,0.6);
}
.job-meta-apply-status {
    color: var(--claro-rojo);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    margin-top: 8px;
    display: block;
}
.job-card.dark-theme .job-meta-apply-status {
    color: var(--claro-blanco);
}
.job-card-desc {
    font-size: 0.9rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.5;
    margin-bottom: 24px;
}
.job-card.dark-theme .job-card-desc {
    color: rgba(255,255,255,0.8);
}
.job-card-arrow {
    align-self: flex-end;
    font-size: 1.3rem;
    color: var(--claro-rojo);
}
.job-card.dark-theme .job-card-arrow {
    color: var(--claro-blanco);
}

/* Modal de Vacante */
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.6);
    backdrop-filter: blur(5px);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
}
.modal-overlay:target {
    display: flex;
}
.modal-content {
    background-color: var(--claro-blanco);
    border-radius: 24px;
    width: 100%;
    max-width: 760px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 15px 50px rgba(0,0,0,0.3);
    position: relative;
    animation: zoomIn 0.3s ease-out;
}
.modal-header-actions {
    position: sticky;
    top: 0;
    background-color: var(--claro-blanco);
    padding: 20px 24px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--claro-gris-borde);
    z-index: 2;
}
.modal-close-btn {
    font-size: 1.8rem;
    color: var(--claro-negro);
    cursor: pointer;
    text-decoration: none !important;
}
.modal-body {
    padding: 24px 32px 40px;
}
.modal-title {
    font-size: 2rem;
    color: var(--claro-negro);
    margin-bottom: 8px;
    line-height: 1.25;
}
.modal-location {
    font-size: 0.95rem;
    color: var(--claro-gris-texto);
    margin-bottom: 24px;
}
.modal-info-grid {
    background-color: var(--claro-gris-fondo);
    border-radius: var(--borde-radio-card);
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 30px;
}
.info-item {
    font-size: 0.9rem;
}
.info-item strong {
    color: var(--claro-negro);
    display: inline-block;
    width: 220px;
}
.modal-desc-title {
    font-size: 1.3rem;
    color: var(--claro-negro);
    margin-bottom: 12px;
}
.modal-desc-text {
    font-size: 0.95rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.7;
    margin-bottom: 32px;
}
.modal-action-box {
    text-align: center;
}

/* Banner ¿No encuentras vacante? */
.no-vacancies-banner {
    background-color: var(--claro-gris-fondo);
    border-radius: 24px;
    padding: 40px;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    align-items: center;
    margin-top: 60px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    overflow: hidden;
}
.no-vac-left {
    display: flex;
    align-items: flex-start;
    gap: 24px;
}
.no-vac-icon {
    font-size: 3rem;
    color: var(--claro-rojo);
    background-color: var(--claro-blanco);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.no-vac-text h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}
.no-vac-text p {
    color: var(--claro-gris-oscuro);
    font-size: 1rem;
    line-height: 1.5;
}
.no-vac-right {
    position: relative;
    height: 200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.no-vac-right img {
    height: 100%;
    border-radius: 16px;
    object-fit: cover;
    z-index: 1;
}
.no-vac-right-sun {
    position: absolute;
    top: 50%;
    right: -60px;
    transform: translateY(-50%);
    width: 250px;
    height: 250px;
    background-color: var(--claro-rojo);
    border-radius: 50%;
    opacity: 0.1;
    z-index: 0;
}

@keyframes zoomIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}

@media (max-width: 992px) {
    .jobs-grid { grid-template-columns: 1fr; }
    .no-vacancies-banner { grid-template-columns: 1fr; }
    .no-vac-right { display: none; }
    .modal-info-grid { grid-template-columns: 1fr; }
}
</style>

<!-- Hero -->
<section class="search-hero">
    <div class="search-hero-content">
        <h1>Encuentra tu próximo <span>gran desafío</span></h1>
        <p>Explora nuestras áreas de trabajo y encuentra oportunidades que impulsen tu crecimiento profesional.</p>
        <div style="max-width: 700px; margin: 0 auto; background: var(--claro-blanco); padding: 10px 20px; border-radius: 50px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; gap: 12px; align-items: center;">
            <span style="font-size:1.2rem; color:var(--claro-gris-texto);">🔍</span>
            <input type="text" placeholder="Cargo (ej: Telemarketing, HR, IT)..." style="flex-grow:1; border:none; outline:none; font-family:var(--fuente-texto); font-size:1rem;" value="Salud">
            <a href="busqueda.html" class="btn-primary" style="padding: 10px 24px !important;">Buscar</a>
        </div>
    </div>
</section>

<!-- Resultados -->
<section class="results-section">
    <div class="results-header">
        <h2>Resultados de tu búsqueda</h2>
    </div>

    <!-- Filtros -->
    <div class="filter-bar">
        <button class="filter-dropdown">Ubicaciones <span>▼</span></button>
        <button class="filter-dropdown">Puesto <span>▼</span></button>
        <button class="filter-dropdown">Fechas de publicación <span>▼</span></button>
        <button class="filter-dropdown">Nivel de Experiencia <span>▼</span></button>
    </div>
    
    <div style="text-align: center; margin-bottom: 24px;">
        <a href="#" style="font-weight: 700; color: var(--claro-negro); border-bottom: 1px solid var(--claro-negro); padding-bottom: 2px; font-size: 0.9rem;">Limpiar filtros</a>
    </div>

    <div style="display:flex; justify-content:flex-end; font-size:0.9rem; margin-bottom:20px; color:var(--claro-gris-oscuro);">
        <span>Ordenar por: <strong>Fecha de publicación</strong> ⇅</span>
    </div>

    <!-- Grid de vacantes -->
    <div class="jobs-grid">
        
        <!-- Vacante 1 (Fondo negro) -->
        <div class="job-card dark-theme" onclick="alert('Esta vacante se cargará en el simulador. Por favor haz clic en la de Salud y Seguridad para abrir el modal interactivo.')">
            <div class="job-card-top">
                <div>
                    <h3 class="job-card-title">Telemarketing y Canales Digitales</h3>
                    <div class="job-meta">
                        <span>GUATEMALA - CIUDAD DE GUATEMALA, Guatemala</span>
                        <span class="job-meta-apply-status">⏱️ Sé el primero en aplicar</span>
                    </div>
                </div>
                <span class="job-fav-icon">☆</span>
            </div>
            <p class="job-card-desc">Atención, ventas y experiencia en canales digitales.</p>
            <span class="job-card-arrow">❯</span>
        </div>

        <!-- Vacante 2 (Salud y Seguridad - ABRE MODAL INTERACTIVO) -->
        <a href="#modal-vacante" style="text-decoration:none !important; color:inherit !important; display:block;">
            <div class="job-card">
                <div class="job-card-top">
                    <div>
                        <h3 class="job-card-title">Salud y Seguridad Ocupacional</h3>
                        <div class="job-meta">
                            <span>Honduras - San Pedro Sula, Honduras</span>
                            <span class="job-meta-apply-status">⏱️ Sé el primero en aplicar</span>
                        </div>
                    </div>
                    <span class="job-fav-icon">☆</span>
                </div>
                <p class="job-card-desc">Promovemos entornos laborales seguros y saludables.</p>
                <span class="job-card-arrow">❯</span>
            </div>
        </a>

        <!-- Vacante 3 -->
        <div class="job-card" onclick="alert('Esta vacante se cargará en el simulador. Por favor haz clic en la de Salud y Seguridad para abrir el modal interactivo.')">
            <div class="job-card-top">
                <div>
                    <h3 class="job-card-title">Inteligencia y Desarrollo Comercial</h3>
                    <div class="job-meta">
                        <span>NICARAGUA - MANAGUA, Nicaragua</span>
                        <span class="job-meta-apply-status">⏱️ Sé el primero en aplicar</span>
                    </div>
                </div>
                <span class="job-fav-icon">☆</span>
            </div>
            <p class="job-card-desc">Estrategia, análisis y desarrollo de oportunidades comerciales.</p>
            <span class="job-card-arrow">❯</span>
        </div>

        <!-- Vacante 4 -->
        <div class="job-card" onclick="alert('Esta vacante se cargará en el simulador. Por favor haz clic en la de Salud y Seguridad para abrir el modal interactivo.')">
            <div class="job-card-top">
                <div>
                    <h3 class="job-card-title">Call Center</h3>
                    <div class="job-meta">
                        <span>HONDURAS - TELAMAR, Honduras</span>
                        <span class="job-meta-apply-status">⏱️ Sé el primero en aplicar</span>
                    </div>
                </div>
                <span class="job-fav-icon" style="color:var(--claro-negro);">★</span>
            </div>
            <p class="job-card-desc">Servicio al cliente y soporte especializado.</p>
            <span class="job-card-arrow">❯</span>
        </div>

        <!-- Vacante 5 (Especial Roja) -->
        <div class="job-card red-theme" onclick="window.location.href='registro.html'">
            <h3 class="job-card-title" style="color:#FFF !important; font-size: 1.4rem;">Red de Talento Claro Centroamérica</h3>
            <p style="font-size:0.9rem; margin-bottom: 24px; color:rgba(255,255,255,0.85);">Obtén información profesional y oportunidades de empleo futuras.</p>
            <a href="registro.html" class="btn-primary" style="background-color:var(--claro-blanco) !important; color:var(--claro-rojo) !important; font-size:0.85rem !important;">Únete a nuestra red</a>
        </div>

        <!-- Vacante 6 -->
        <div class="job-card" onclick="alert('Esta vacante se cargará en el simulador. Por favor haz clic en la de Salud y Seguridad para abrir el modal interactivo.')">
            <div class="job-card-top">
                <div>
                    <h3 class="job-card-title">Recursos Humanos</h3>
                    <div class="job-meta">
                        <span>GUATEMALA - CIUDAD DE GUATEMALA, Guatemala</span>
                        <span class="job-meta-apply-status">⏱️ Sé el primero en aplicar</span>
                    </div>
                </div>
                <span class="job-fav-icon">☆</span>
            </div>
            <p class="job-card-desc">Gestión del talento, cultura y desarrollo organizacional.</p>
            <span class="job-card-arrow">❯</span>
        </div>

    </div>

    <!-- Ver Más -->
    <div style="text-align: center;">
        <button class="btn-secondary" style="padding:14px 40px !important;">Ver Más ∨</button>
    </div>

    <!-- Banner No Vacantes -->
    <div class="no-vacancies-banner">
        <div class="no-vac-left">
            <div class="no-vac-icon">📄</div>
            <div class="no-vac-text">
                <h3>¿No encuentras la vacante ideal?</h3>
                <p>Registra tus datos en nuestro formulario de postulación abierta y te notificaremos cuando hayan vacantes que se ajusten a tu perfil profesional.</p>
                <a href="registro.html" class="btn-primary" style="margin-top:20px;">Registrar mis datos</a>
            </div>
        </div>
        <div class="no-vac-right">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" alt="Candidato">
            <div class="no-vac-right-sun"></div>
        </div>
    </div>
</section>

<!-- MODAL DE VACANTE INTERACTIVO -->
<div class="modal-overlay" id="modal-vacante">
    <div class="modal-content">
        <div class="modal-header-actions">
            <button style="background:none; border:none; font-size:1.2rem; cursor:pointer;" onclick="alert('Simulación: Enlace de compartir copiado.')">🔗</button>
            <button style="background:none; border:none; font-size:1.2rem; cursor:pointer;">☆</button>
            <a href="#" class="modal-close-btn">&times;</a>
        </div>
        <div class="modal-body">
            <h1 class="modal-title">Salud y Seguridad Ocupacional</h1>
            <div class="modal-location">Honduras - San Pedro Sula</div>
            
            <div class="modal-info-grid">
                <div class="info-item"><strong>Identificación del puesto:</strong> 329967</div>
                <div class="info-item"><strong>Categoría del puesto:</strong> Salud y Seguridad / Operaciones</div>
                <div class="info-item"><strong>Fecha de publicación:</strong> 18/05/2026</div>
                <div class="info-item"><strong>Rol:</strong> Contribuidor Individual / Especialista</div>
                <div class="info-item"><strong>Tipo de empleo:</strong> Empleado regular (Tiempo completo)</div>
                <div class="info-item"><strong>¿Requiere autorización?:</strong> No</div>
                <div class="info-item"><strong>Años de experiencia:</strong> 3 a 5+ años</div>
                <div class="info-item"><strong>Candidatos:</strong> Menos de 10 candidatos</div>
                <div class="info-item"><strong>Idiomas requeridos:</strong> Español, Inglés</div>
            </div>

            <h3 class="modal-desc-title">Descripción:</h3>
            <p class="modal-desc-text">
                Promovemos entornos laborales seguros y saludables.<br><br>
                Como miembro del departamento de Salud y Seguridad Ocupacional, tendrás un rol activo en la definición y evolución de las políticas, prácticas y procedimientos de seguridad estándar de la empresa. Serás responsable de definir, desarrollar e implementar programas orientados a la prevención de riesgos laborales, auditorías en campo y asegurar el cumplimiento normativo.<br><br>
                El trabajo no es rutinario y es de alta complejidad, lo que implica la aplicación de conocimientos técnicos y normativos avanzados en el área de especialización. Actuarás como un contribuidor clave, tanto de forma individual como siendo parte del equipo, brindando orientación, mentoría y capacitación a otros colaboradores.<br><br>
                Se requiere título universitario (Licenciatura o Ingeniería) en Salud y Seguridad Ocupacional, Ingeniería Industrial o experiencia equivalente relevante para el área funcional. 7 años de experiencia comprobable en seguridad industrial o campos relacionados.
            </p>

            <div class="modal-action-box">
                <a href="registro.html" class="btn-primary" style="padding:16px 50px !important;">Aplica Ahora</a>
            </div>
        </div>
    </div>
</div>
`;

// --------------------------------------------------------------------------------
// 3. GENERAR cultura.html (Nuestra Esencia)
// --------------------------------------------------------------------------------
const cultureContent = `
<style>
.culture-hero {
    position: relative;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
    padding: 80px 24px;
    color: var(--claro-blanco);
    text-align: center;
}
.culture-hero h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
}
.culture-hero h1 span {
    color: var(--claro-rojo);
}
.culture-hero p {
    font-size: 1.15rem;
    max-width: 600px;
    margin: 0 auto;
}

/* Así es trabajar en Claro */
.work-at-claro {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}
.work-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 48px;
}
.work-card {
    background-color: var(--claro-blanco);
    border-radius: var(--borde-radio-card);
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    overflow: hidden;
    transition: var(--transicion);
    border: 1px solid var(--claro-gris-borde);
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: column;
}
.work-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.1);
}
.work-card-img {
    height: 180px;
    position: relative;
}
.work-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.work-card-icon-badge {
    position: absolute;
    bottom: -20px;
    left: 20px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: var(--claro-rojo);
    color: var(--claro-blanco);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(218, 41, 28, 0.3);
}
.work-card-body {
    padding: 32px 20px 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.work-card-title {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 8px;
}
.work-card-text {
    font-size: 0.85rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.5;
    margin-bottom: 16px;
}
.work-card-link {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--claro-rojo);
}

/* Barra roja inferior */
.red-footer-banner {
    background: linear-gradient(90deg, #b81e13, #DA291C);
    color: var(--claro-blanco);
    padding: 40px 24px;
}
.red-footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}
.red-footer-item {
    text-align: center;
    padding: 0 10px;
}
.red-footer-icon {
    font-size: 2.2rem;
    margin-bottom: 16px;
    display: block;
}
.red-footer-item h4 {
    font-size: 1.15rem;
    margin-bottom: 8px;
}
.red-footer-item p {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.8);
    line-height: 1.6;
}

@media (max-width: 992px) {
    .work-grid { grid-template-columns: 1fr 1fr; }
    .red-footer-inner { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 576px) {
    .work-grid { grid-template-columns: 1fr; }
}
</style>

<!-- Hero -->
<section class="culture-hero">
    <h1>Vive la experiencia <span>Claro</span></h1>
    <p>Más que un lugar para trabajar, somos un ecosistema donde impulsamos tu talento y bienestar.</p>
</section>

<!-- Así es trabajar en Claro -->
<section class="work-at-claro">
    <div class="section-header">
        <h2>Así es trabajar en Claro</h2>
        <p style="color:var(--claro-gris-texto); font-size:1.15rem; max-width:700px; margin:16px auto 0;">Una cultura que conecta talento, innovación y propósito para transformar vidas.</p>
    </div>

    <div class="work-grid">
        <!-- Tarjeta 1 -->
        <div class="work-card">
            <div class="work-card-img">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80" alt="Cultura">
                <div class="work-card-icon-badge">👥</div>
            </div>
            <div class="work-card-body">
                <div>
                    <h4 class="work-card-title">Nuestra cultura</h4>
                    <p class="work-card-text">Fomentamos un ambiente inclusivo, colaborativo y enfocado en el bienestar de nuestra gente.</p>
                </div>
                <a href="beneficios.html" class="work-card-link">Ver beneficios →</a>
            </div>
        </div>
        
        <!-- Tarjeta 2 -->
        <div class="work-card">
            <div class="work-card-img">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80" alt="Historias">
                <div class="work-card-icon-badge">🗣️</div>
            </div>
            <div class="work-card-body">
                <div>
                    <h4 class="work-card-title">Historias que inspiran</h4>
                    <p class="work-card-text">Conoce las experiencias de nuestros colaboradores y cómo han crecido laboralmente dentro de la gran familia Claro.</p>
                </div>
                <a href="pais.html" class="work-card-link">Ver beneficios →</a>
            </div>
        </div>

        <!-- Tarjeta 3 -->
        <div class="work-card">
            <div class="work-card-img">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80" alt="Desarrollo">
                <div class="work-card-icon-badge">📈</div>
            </div>
            <div class="work-card-body">
                <div>
                    <h4 class="work-card-title">Creces en Claro</h4>
                    <p class="work-card-text">Impulsamos tu desarrollo profesional con programas de capacitación constante, movilidad regional y liderazgo.</p>
                </div>
                <a href="pais.html" class="work-card-link">Ver beneficios →</a>
            </div>
        </div>

        <!-- Tarjeta 4 -->
        <div class="work-card">
            <div class="work-card-img">
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" alt="Beneficios">
                <div class="work-card-icon-badge">❤️</div>
            </div>
            <div class="work-card-body">
                <div>
                    <h4 class="work-card-title">Beneficios</h4>
                    <p class="work-card-text">Te ofrecemos beneficios competitivos adicionales a los de ley pensados para ti y para tu núcleo familiar.</p>
                </div>
                <a href="beneficios.html" class="work-card-link">Ver beneficios →</a>
            </div>
        </div>
    </div>
</section>

<!-- Barra roja -->
<section class="red-footer-banner">
    <div class="red-footer-inner">
        <div class="red-footer-item">
            <span class="red-footer-icon">📈</span>
            <h4>Trabaja con nosotros</h4>
            <p>Descubre nuevas oportunidades y forma parte de un equipo que conecta personas, innovación y tecnología en toda la región.</p>
        </div>
        <div class="red-footer-item">
            <span class="red-footer-icon">👥</span>
            <h4>Gestión de Talento</h4>
            <p>Impulsamos el crecimiento de nuestra gente mediante programas de formación, desarrollo profesional y aprendizaje continuo.</p>
        </div>
        <div class="red-footer-item">
            <span class="red-footer-icon">❤️</span>
            <h4>Salud y Bienestar</h4>
            <p>Promovemos un entorno laboral seguro, saludable y equilibrado, enfocado en el bienestar integral de nuestros colaboradores.</p>
        </div>
    </div>
</section>
`;

// --------------------------------------------------------------------------------
// 4. GENERAR beneficios.html (Nuestros Beneficios)
// --------------------------------------------------------------------------------
const benefitsContent = `
<style>
.benefits-hero {
    position: relative;
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
    padding: 80px 24px;
    color: var(--claro-blanco);
    text-align: center;
}
.benefits-hero h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
}
.benefits-hero p {
    font-size: 1.15rem;
    max-width: 600px;
    margin: 0 auto;
}

/* Tarjetas de Beneficios */
.benefits-section {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
}
.benefits-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 48px;
}
.benefit-card {
    background-color: var(--claro-blanco);
    border: 1px solid var(--claro-gris-borde);
    border-radius: var(--borde-radio-card);
    padding: 32px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    transition: var(--transicion);
}
.benefit-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    border-color: var(--claro-rojo);
}
.benefit-icon-box {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background-color: rgba(218, 41, 28, 0.08);
    color: var(--claro-rojo);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    flex-shrink: 0;
}
.benefit-card h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
}
.benefit-card p {
    font-size: 0.9rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.6;
}

/* Tabla comparativa */
.comparison-section {
    background-color: var(--claro-gris-fondo);
    padding: 80px 24px;
}
.comparison-inner {
    max-width: 900px;
    margin: 0 auto;
}
.comparison-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: var(--claro-blanco);
    border-radius: var(--borde-radio-card);
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.comparison-table th {
    background-color: var(--claro-negro);
    color: var(--claro-blanco);
    padding: 18px 24px;
    font-family: var(--fuente-titulo);
    font-weight: 700;
    text-align: left;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 1px;
}
.comparison-table td {
    padding: 16px 24px;
    border-bottom: 1px solid var(--claro-gris-borde);
    font-size: 0.95rem;
}
.comparison-table tr:last-child td {
    border-bottom: none;
}
.comparison-table td:nth-child(2) {
    color: var(--claro-gris-texto);
}
.comparison-table td:nth-child(3) {
    font-weight: 600;
    color: var(--claro-rojo);
}

@media (max-width: 768px) {
    .benefits-grid { grid-template-columns: 1fr; }
    .comparison-table th, .comparison-table td { padding: 12px 16px; font-size: 0.85rem; }
}
</style>

<section class="benefits-hero">
    <h1>Nuestros Beneficios</h1>
    <p>Conoce las prestaciones y ventajas de formar parte del equipo de Claro en la región.</p>
</section>

<section class="benefits-section">
    <div class="section-header" style="text-align:center;">
        <h2>Prestaciones que marcan la diferencia</h2>
        <p style="color:var(--claro-gris-texto); font-size:1.1rem; max-width:600px; margin:12px auto 0;">En Claro nos importa el bienestar físico, profesional, social y financiero de toda nuestra comunidad.</p>
    </div>

    <div class="benefits-grid">
        <!-- Beneficio 1 -->
        <div class="benefit-card">
            <div class="benefit-icon-box">🩺</div>
            <div>
                <h3>Seguro de Gastos Médicos</h3>
                <p>Cobertura médica extendida para ti y tus dependientes directos, garantizando atención médica privada de primer nivel.</p>
            </div>
        </div>
        <!-- Beneficio 2 -->
        <div class="benefit-card">
            <div class="benefit-icon-box">💰</div>
            <div>
                <h3>Fondo de Ahorro Colectivo</h3>
                <p>Plan de ahorro respaldado con aportación patronal directa para asegurar la estabilidad financiera de tus proyectos futuros.</p>
            </div>
        </div>
        <!-- Beneficio 3 -->
        <div class="benefit-card">
            <div class="benefit-icon-box">🎓</div>
            <div>
                <h3>Capacitación Continua</h3>
                <p>Acceso ilimitado a nuestra plataforma de e-learning corporativa y apoyos financieros para certificaciones técnicas de IT.</p>
            </div>
        </div>
        <!-- Beneficio 4 -->
        <div class="benefit-card">
            <div class="benefit-icon-box">⚖️</div>
            <div>
                <h3>Balance de Vida</h3>
                <p>Esquemas de trabajo híbridos en las posiciones aplicables, días libres por hitos personales y horario flexible de salida.</p>
            </div>
        </div>
    </div>
</section>

<!-- Tabla comparativa -->
<section class="comparison-section">
    <div class="comparison-inner">
        <h2 style="text-align:center; font-size:2rem; margin-bottom:40px;">¿Qué nos hace diferentes?</h2>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Prestación</th>
                    <th>Mínimo por Ley</th>
                    <th>Beneficio Claro</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Vacaciones Anuales</td>
                    <td>Estándar local de ley</td>
                    <td>Días adicionales de descanso desde el primer año</td>
                </tr>
                <tr>
                    <td>Seguros de Vida y Gastos Médicos</td>
                    <td>No requerido</td>
                    <td>Cubiertos al 100% por la empresa</td>
                </tr>
                <tr>
                    <td>Capacitación Técnica</td>
                    <td>Básica de inducción</td>
                    <td>Programas de formación externa y certificaciones IT</td>
                </tr>
                <tr>
                    <td>Compensación Flexible</td>
                    <td>Sueldo base</td>
                    <td>Bonos de desempeño y vales adicionales de despensa</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>
`;

// --------------------------------------------------------------------------------
// 5. GENERAR apoyo.html (Apoyo al Candidato / Proceso y FAQs)
// --------------------------------------------------------------------------------
const supportContent = `
<style>
.support-hero {
    position: relative;
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
    padding: 80px 24px;
    color: var(--claro-blanco);
    text-align: center;
}
.support-hero h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
}
.support-hero h1 span {
    color: var(--claro-rojo);
}
.support-hero p {
    font-size: 1.15rem;
    max-width: 680px;
    margin: 0 auto;
}

/* FAQ y Consejos */
.faq-tips-section {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
}
.column-title {
    font-size: 1.8rem;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
}
.column-subtitle {
    font-size: 0.95rem;
    color: var(--claro-gris-texto);
    margin-bottom: 30px;
}

/* Acordeón FAQs (Pure CSS con input checkbox) */
.faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.faq-item {
    border: 1px solid var(--claro-gris-borde);
    border-radius: var(--borde-radio-card);
    background-color: var(--claro-blanco);
    overflow: hidden;
}
.faq-input {
    display: none;
}
.faq-header {
    padding: 20px 24px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    transition: var(--transicion);
}
.faq-header:hover {
    background-color: var(--claro-gris-fondo);
}
.faq-header-icon {
    font-size: 1.2rem;
    color: var(--claro-rojo);
    transition: var(--transicion);
}
.faq-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease-out;
    padding: 0 24px;
    font-size: 0.92rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.6;
}
/* Al marcar el checkbox, expandir el panel */
.faq-input:checked ~ .faq-content {
    max-height: 200px;
    padding-bottom: 20px;
}
.faq-input:checked ~ .faq-header .faq-header-icon {
    transform: rotate(45deg);
}

/* Consejos Tarjetas */
.tips-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.tip-card {
    background-color: var(--claro-blanco);
    border: 1px solid var(--claro-gris-borde);
    border-radius: var(--borde-radio-card);
    padding: 20px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: var(--transicion);
}
.tip-card:hover {
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    border-color: rgba(218, 41, 28, 0.3);
}
.tip-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(218, 41, 28, 0.05);
    color: var(--claro-rojo);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
}
.tip-card h4 {
    font-size: 1.05rem;
    margin-bottom: 6px;
}
.tip-card p {
    font-size: 0.85rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.5;
}

@media (max-width: 992px) {
    .faq-tips-section { grid-template-columns: 1fr; gap: 48px; }
}
</style>

<!-- Hero -->
<section class="support-hero">
    <div class="support-hero-content">
        <h1>Experiencia del <span>Candidato</span></h1>
        <p>Tu camino hacia una nueva oportunidad comienza acá. Queremos que tu proceso sea claro, simple y transparente. Conoce cada etapa y prepárate para dar el siguiente paso.</p>
    </div>
</section>

<!-- Timeline (Reuse layout) -->
<section class="experience-section" style="background-color: var(--claro-gris-fondo);">
    <div style="text-align: center; margin-bottom: 48px;">
        <h2 style="font-size: 2rem; color: var(--claro-negro);">Así funciona tu proceso en Claro</h2>
        <p style="color:var(--claro-gris-texto); font-size: 0.95rem; margin-top:8px;">Un proceso transparente, ágil y pensado para que tengas una mejor experiencia.</p>
    </div>
    <div class="experience-timeline" style="max-width:1200px; margin:0 auto;">
        <div class="timeline-step">
            <div class="timeline-step-icon">📝</div>
            <h4>1. Postúlate</h4>
            <p>Encuentra la vacante ideal y envía tu postulación en pocos pasos.</p>
        </div>
        <div class="timeline-step">
            <div class="timeline-step-icon">🔍</div>
            <h4>2. Descubrimos tu talento</h4>
            <p>Analizamos tu perfil, experiencia y competencias de forma integral.</p>
        </div>
        <div class="timeline-step">
            <div class="timeline-step-icon">📞</div>
            <h4>3. Conectamos</h4>
            <p>Conoce a nuestro equipo y conversemos en confianza sobre tu futuro.</p>
        </div>
        <div class="timeline-step">
            <div class="timeline-step-icon">✔️</div>
            <h4>4. Comienza tu historia</h4>
            <p>¡Bienvenido a Claro! Comienza tu nueva etapa profesional de inmediato.</p>
        </div>
    </div>
</section>

<!-- FAQs y Consejos -->
<section class="faq-tips-section">
    
    <!-- FAQs -->
    <div>
        <h3 class="column-title">💬 Preguntas frecuentes</h3>
        <p class="column-subtitle">Resuelve tus dudas sobre el proceso</p>
        
        <div class="faq-accordion">
            <!-- FAQ 1 -->
            <div class="faq-item">
                <input type="checkbox" id="faq1" class="faq-input">
                <label for="faq1" class="faq-header">
                    <span>¿Necesito crear un perfil para aplicar?</span>
                    <span class="faq-header-icon">+</span>
                </label>
                <div class="faq-content">
                    Sí. Al crear tu perfil en nuestra comunidad de talento, puedes aplicar a vacantes de forma ágil y dar un seguimiento detallado en tiempo real del estado de tus postulaciones.
                </div>
            </div>
            
            <!-- FAQ 2 -->
            <div class="faq-item">
                <input type="checkbox" id="faq2" class="faq-input">
                <label for="faq2" class="faq-header">
                    <span>¿Puedo aplicar a más de una vacante?</span>
                    <span class="faq-header-icon">+</span>
                </label>
                <div class="faq-content">
                    Sí. Puedes postularte a todas las oportunidades que consideres que se ajustan a tu perfil profesional, competencias y experiencia laboral.
                </div>
            </div>

            <!-- FAQ 3 -->
            <div class="faq-item">
                <input type="checkbox" id="faq3" class="faq-input">
                <label for="faq3" class="faq-header">
                    <span>¿Cómo puedo revisar el estado de mi aplicación?</span>
                    <span class="faq-header-icon">+</span>
                </label>
                <div class="faq-content">
                    Simplemente ingresa a tu perfil de usuario en nuestra plataforma con tu correo y contraseña, y en la sección "Resumen de actividad" podrás visualizar los estatus detallados.
                </div>
            </div>

            <!-- FAQ 4 -->
            <div class="faq-item">
                <input type="checkbox" id="faq4" class="faq-input">
                <label for="faq4" class="faq-header">
                    <span>¿Qué pasa si no fui seleccionado?</span>
                    <span class="faq-header-icon">+</span>
                </label>
                <div class="faq-content">
                    Si tu perfil no avanza para una posición en específico, mantendremos tus datos almacenados de forma segura en nuestra Red de Talento para contactarte cuando surjan vacantes que se adecúen a ti.
                </div>
            </div>

            <!-- FAQ 5 -->
            <div class="faq-item">
                <input type="checkbox" id="faq5" class="faq-input">
                <label for="faq5" class="faq-header">
                    <span>¿Puedo actualizar mi perfil después?</span>
                    <span class="faq-header-icon">+</span>
                </label>
                <div class="faq-content">
                    Sí. Puedes ingresar a tu perfil en cualquier momento para actualizar tu hoja de vida, número telefónico de contacto o tus áreas y países de interés.
                </div>
            </div>
        </div>
    </div>

    <!-- Consejos -->
    <div>
        <h3 class="column-title">💡 Consejos para postular</h3>
        <p class="column-subtitle">Prepárate de la mejor forma para destacar</p>
        
        <div class="tips-container">
            <div class="tip-card">
                <div class="tip-icon-box">👤</div>
                <div>
                    <h4>Completa tu perfil</h4>
                    <p>Asegúrate de mantener tu experiencia laboral y datos de contacto siempre actualizados para facilitar el contacto técnico.</p>
                </div>
            </div>
            <div class="tip-card">
                <div class="tip-icon-box">⭐</div>
                <div>
                    <h4>Destaca tu experiencia</h4>
                    <p>Incluye información muy clara sobre los proyectos en los que has participado, tus logros numéricos y tus habilidades clave.</p>
                </div>
            </div>
            <div class="tip-card">
                <div class="tip-icon-box">✔️</div>
                <div>
                    <h4>Revisa tu información</h4>
                    <p>Verifica que tu correo y número de teléfono estén correctamente ingresados antes de enviar tu formulario de aplicación.</p>
                </div>
            </div>
            <div class="tip-card">
                <div class="tip-icon-box">🎯</div>
                <div>
                    <h4>Aplica a oportunidades alineadas</h4>
                    <p>Postúlate a las vacantes que realmente conecten con tu experiencia previa, tus objetivos profesionales y tu vocación técnica.</p>
                </div>
            </div>
        </div>
    </div>

</section>
`;

// --------------------------------------------------------------------------------
// 6. GENERAR registro.html (Registro Comunidad de Talento - Pasos)
// --------------------------------------------------------------------------------
const registerContent = `
<style>
.register-hero {
    position: relative;
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
    padding: 80px 24px;
    color: var(--claro-blanco);
    text-align: center;
}
.register-hero h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
}
.register-hero h1 span {
    color: var(--claro-rojo);
}
.register-hero p {
    font-size: 1.15rem;
    max-width: 600px;
    margin: 0 auto;
}

/* Panel de Formulario por Pasos interactivo */
.register-section {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.tab-container {
    background-color: var(--claro-blanco);
    border: 1px solid var(--claro-gris-borde);
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    width: 100%;
    max-width: 800px;
    padding: 48px;
    position: relative;
}

/* Sistema de Pestañas por CSS puro */
.step-input-check {
    display: none;
}
.steps-indicators {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-bottom: 30px;
}
.step-indicator {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--claro-gris-borde);
    transition: var(--transicion);
}

.step-panel {
    display: none;
    animation: fadeIn 0.4s ease-out;
}
.step-panel-title {
    text-align: center;
    font-size: 2rem;
    color: var(--claro-negro);
    margin-bottom: 8px;
}
.step-panel-subtitle {
    text-align: center;
    font-size: 0.95rem;
    color: var(--claro-gris-texto);
    margin-bottom: 40px;
    position: relative;
    padding-bottom: 12px;
}
.step-panel-subtitle::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--claro-rojo);
    border-radius: 2px;
}

/* Selectores múltiples de chips */
.chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
    margin-bottom: 20px;
}
.chip {
    background-color: var(--claro-gris-fondo);
    border: 1px solid var(--claro-gris-borde);
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}
.chip.active {
    background-color: rgba(218, 41, 28, 0.1);
    border-color: var(--claro-rojo);
    color: var(--claro-rojo);
    font-weight: 600;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
.file-upload-box {
    border: 2px dashed var(--claro-gris-borde);
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: var(--transicion);
}
.file-upload-box:hover {
    border-color: var(--claro-rojo);
    background-color: rgba(218, 41, 28, 0.02);
}

/* Controladores de visibilidad de pasos */
#check-step1:checked ~ .tab-container #panel-step1 { display: block; }
#check-step1:checked ~ .tab-container .steps-indicators .step-indicator:nth-child(1) { background-color: var(--claro-negro); }

#check-step2:checked ~ .tab-container #panel-step2 { display: block; }
#check-step2:checked ~ .tab-container .steps-indicators .step-indicator:nth-child(2) { background-color: var(--claro-negro); }

#check-step3:checked ~ .tab-container #panel-step3 { display: block; }
#check-step3:checked ~ .tab-container .steps-indicators .step-indicator:nth-child(3) { background-color: var(--claro-negro); }

.step-actions {
    margin-top: 40px;
    display: flex;
    justify-content: center;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .tab-container { padding: 24px; }
    .form-row { grid-template-columns: 1fr; gap: 0; }
}
</style>

<!-- Hero -->
<section class="register-hero">
    <h1>Tu próximo paso <span>comienza aquí</span></h1>
    <p>Crea tu perfil, administra tu información y da seguimiento a tus postulaciones en un solo lugar.</p>
</section>

<!-- Formulario por pasos -->
<section class="register-section">
    <!-- Selectores invisibles -->
    <input type="radio" name="register-steps" id="check-step1" class="step-input-check" checked>
    <input type="radio" name="register-steps" id="check-step2" class="step-input-check">
    <input type="radio" name="register-steps" id="check-step3" class="step-input-check">

    <div class="tab-container">
        
        <!-- Indicadores de paso -->
        <div class="steps-indicators">
            <span class="step-indicator"></span>
            <span class="step-indicator"></span>
            <span class="step-indicator"></span>
        </div>

        <!-- PASO 1: Iniciar Sesión / Registro inicial -->
        <div class="step-panel" id="panel-step1">
            <h2 class="step-panel-title">Únete a nuestra comunidad de talento</h2>
            <div class="step-panel-subtitle">Iniciar sesión / Crear cuenta</div>
            
            <div class="form-group">
                <label>Dirección de Correo *</label>
                <input type="email" placeholder="ejemplo@correo.com" required value="vinicio.sanchez@correo.com">
            </div>
            
            <div class="form-group" style="margin-bottom: 24px;">
                <label>Contraseña *</label>
                <input type="password" placeholder="Mínimo 8 caracteres" required value="contraseña123">
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; font-size:0.9rem;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                    <input type="checkbox" checked required> Estoy de acuerdo con los <a href="#" style="font-weight:600;">términos y condiciones. *</a>
                </label>
                <a href="#" style="font-weight:600; color:var(--claro-rojo);">¿No tienes cuenta? Crear una</a>
            </div>

            <div class="step-actions">
                <label for="check-step2" class="btn-primary" style="padding:14px 44px !important;">Siguiente ❯</label>
            </div>
        </div>

        <!-- PASO 2: Llenar solicitud -->
        <div class="step-panel" id="panel-step2">
            <h2 class="step-panel-title">Únete a nuestra comunidad de talento</h2>
            <div class="step-panel-subtitle">Llenar solicitud</div>

            <div class="form-group">
                <label>Áreas de interés *</label>
                <div class="chips-container">
                    <span class="chip active">Recursos Humanos ✕</span>
                    <span class="chip active">IT ✕</span>
                    <span class="chip">Telemarketing</span>
                    <span class="chip">Finanzas</span>
                    <span class="chip">Ventas</span>
                </div>
            </div>

            <div class="form-group">
                <label>Ubicación de interés *</label>
                <div class="chips-container">
                    <span class="chip active">Guatemala ✕</span>
                    <span class="chip active">Honduras ✕</span>
                    <span class="chip">Nicaragua</span>
                    <span class="chip">El Salvador</span>
                </div>
            </div>

            <div style="background-color:var(--claro-gris-fondo); border-radius:12px; padding:20px; margin-bottom:24px;">
                <h4 style="margin-bottom:8px; font-size:0.95rem;">Información personal *</h4>
                <p style="font-size:0.8rem; color:var(--claro-gris-texto); line-height:1.5; margin-bottom:20px;">
                    Ingresa tus datos personales tal y como aparecen en tu documento oficial. Esta información será utilizada durante el proceso de reclutamiento.
                </p>

                <div class="form-row">
                    <div class="form-group">
                        <label>Primer nombre *</label>
                        <input type="text" value="Vinicio" required>
                    </div>
                    <div class="form-group">
                        <label>Segundo nombre</label>
                        <input type="text" value="Alejandro">
                    </div>
                </div>

                <div class="form-row" style="margin-top:12px;">
                    <div class="form-group">
                        <label>Apellidos *</label>
                        <input type="text" value="Sánchez" required>
                    </div>
                    <div class="form-group">
                        <label>Número de teléfono *</label>
                        <div style="display:flex; gap:8px;">
                            <select style="width:90px; padding:12px 6px; border:1px solid var(--claro-gris-borde); border-radius:8px; font-family:var(--fuente-texto); font-size:0.9rem;">
                                <option value="504">🇭🇳 +504</option>
                                <option value="502">🇬🇹 +502</option>
                                <option value="505">🇳🇮 +505</option>
                            </select>
                            <input type="tel" value="99887766" style="flex-grow:1;" required>
                        </div>
                    </div>
                </div>

                <div class="form-row" style="margin-top:12px;">
                    <div class="form-group">
                        <label>Tipo de documento *</label>
                        <select style="width:100%; padding:12px 16px; border:1px solid var(--claro-gris-borde); border-radius:8px; font-family:var(--fuente-texto); font-size:0.9rem;">
                            <option>DNI (Documento Nacional de Identificación)</option>
                            <option>Pasaporte</option>
                            <option>Licencia de Conducir</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Documento de identificación *</label>
                        <input type="text" value="0801-1995-12345" required>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Adjunta tu CV *</label>
                <div class="file-upload-box" onclick="alert('Simulación: Seleccionar archivo CV')">
                    <span style="font-size:2rem; display:block; margin-bottom:12px;">📎</span>
                    <strong style="color:var(--claro-rojo); display:block; margin-bottom:4px;">Mi_CV_Vinicio_Sanchez.pdf</strong>
                    <span style="font-size:0.78rem; color:var(--claro-gris-texto);">Formatos permitidos: PDF, DOC y DOCX.</span>
                </div>
            </div>

            <div class="step-actions" style="gap:16px;">
                <label for="check-step1" class="btn-secondary" style="padding:12px 36px !important;">Atrás</label>
                <label for="check-step3" class="btn-primary" style="padding:12px 40px !important;">Siguiente ❯</label>
            </div>
        </div>

        <!-- PASO 3: Registro Exitoso -->
        <div class="step-panel" id="panel-step3">
            <div style="text-align:center; padding:20px 0;">
                <div style="width:80px; height:80px; border-radius:50%; background-color:#27AE60; color:var(--claro-blanco); display:flex; align-items:center; justify-content:center; margin:0 auto 24px; font-size:2.5rem; box-shadow:0 4px 15px rgba(39,174,96,0.3);">✓</div>
                
                <h2 class="step-panel-title" style="margin-bottom:16px;">¡Tu registro fue exitoso!</h2>
                <div style="width:60px; height:3px; background-color:var(--claro-rojo); margin:0 auto 24px; border-radius:2px;"></div>
                
                <p style="font-size:1.1rem; color:var(--claro-negro); font-weight:600; margin-bottom:12px;">Ya formas parte de nuestra comunidad de talento.</p>
                <p style="font-size:0.95rem; color:var(--claro-gris-oscuro); max-width:500px; margin:0 auto 40px; line-height:1.6;">
                    Ahora puedes administrar tu perfil, actualizar tus preferencias y explorar nuevas oportunidades que se adapten a tu experiencia e intereses.
                </p>

                <div style="display:flex; justify-content:center; gap:16px;">
                    <label for="check-step2" class="btn-secondary" style="padding:12px 36px !important;">❮ Volver</label>
                    <a href="perfil.html" class="btn-primary" style="padding:12px 40px !important; text-decoration:none !important;">Ver Perfil ❯</a>
                </div>
            </div>
        </div>

    </div>
</section>
`;

// --------------------------------------------------------------------------------
// 7. GENERAR perfil.html (Perfil Privado - ¡Hola Vinicio!)
// --------------------------------------------------------------------------------
const profileContent = `
<style>
.profile-banner {
    position: relative;
    height: 250px;
    background: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
}
.profile-card {
    max-width: 1000px;
    margin: -100px auto 60px;
    position: relative;
    z-index: 10;
    padding: 0 24px;
}
.profile-card-inner {
    background-color: var(--claro-blanco);
    border: 1px solid var(--claro-gris-borde);
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    padding: 40px;
    text-align: center;
}
.profile-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 6px solid var(--claro-blanco);
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    margin: -115px auto 20px;
    overflow: hidden;
    background-color: var(--claro-gris-borde);
}
.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.profile-name {
    font-size: 2.2rem;
    color: var(--claro-negro);
    margin-bottom: 8px;
}
.profile-email {
    font-size: 1.05rem;
    color: var(--claro-gris-texto);
    margin-bottom: 20px;
}
.profile-desc {
    font-size: 0.95rem;
    color: var(--claro-gris-oscuro);
    max-width: 580px;
    margin: 0 auto 30px;
    line-height: 1.6;
}

/* Áreas de Interés */
.interest-section {
    padding: 40px 24px;
    max-width: 1000px;
    margin: 0 auto;
}
.interest-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 40px;
}
.interest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
.interest-item {
    background-color: var(--claro-blanco);
    border: 1px solid var(--claro-gris-borde);
    border-radius: var(--borde-radio-card);
    padding: 24px;
    text-align: center;
    transition: var(--transicion);
}
.interest-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.05);
}
.interest-icon {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: rgba(218, 41, 28, 0.05);
    color: var(--claro-rojo);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto 16px;
}
.interest-item h4 {
    font-size: 1.1rem;
    margin-bottom: 8px;
}
.interest-item p {
    font-size: 0.82rem;
    color: var(--claro-gris-texto);
    line-height: 1.4;
}

/* Resumen Actividad y Banner conectado */
.dashboard-section {
    padding: 40px 24px 80px;
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
}
.dashboard-title {
    font-size: 1.6rem;
    margin-bottom: 24px;
}
.dashboard-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.dashboard-item {
    background-color: #ECEFF1;
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--claro-negro);
}
.dashboard-number {
    font-size: 1.5rem;
    color: var(--claro-rojo);
}

/* Caja promo conectate */
.promo-box {
    border: 1px solid var(--claro-gris-borde);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    background-color: var(--claro-blanco);
    position: relative;
    display: flex;
    flex-direction: column;
}
.promo-top-img {
    height: 160px;
    background: linear-gradient(135deg, rgba(218, 41, 28, 0.9) 0%, rgba(168, 28, 18, 0.8) 100%),
                url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80') no-repeat center center/cover;
    color: var(--claro-blanco);
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.promo-top-img h3 {
    font-size: 1.6rem;
    margin-bottom: 8px;
}
.promo-body {
    padding: 30px;
    flex-grow: 1;
}
.promo-body p {
    font-size: 0.9rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.5;
    margin-bottom: 24px;
}
.promo-icons {
    display: flex;
    justify-content: space-between;
    text-align: center;
}
.promo-icon-item {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--claro-gris-oscuro);
}
.promo-icon-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(218, 41, 28, 0.05);
    color: var(--claro-rojo);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .interest-grid { grid-template-columns: 1fr; }
    .dashboard-section { grid-template-columns: 1fr; }
}
</style>

<!-- Banner playa -->
<div class="profile-banner"></div>

<!-- Card de Perfil -->
<section class="profile-card">
    <div class="profile-card-inner">
        <div class="profile-avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80" alt="Vinicio">
        </div>
        <h1 class="profile-name">¡Hola, Vinicio!</h1>
        <div class="profile-email">Vinicio.sanchez@correo.com</div>
        <p class="profile-desc">Administra tu información, mantén actualizado tu perfil y da seguimiento a tus oportunidades laborales de forma centralizada.</p>
        <button class="btn-secondary" onclick="alert('Simulación: Editar datos personales')">Editar información personal</button>
    </div>
</section>

<!-- Áreas de interés -->
<section class="interest-section">
    <h2 class="interest-title">Áreas de interés</h2>
    <div class="interest-grid">
        <div class="interest-item">
            <div class="interest-icon">📢</div>
            <h4>Mercadeo Corporativo</h4>
            <p>Comunicación, marca y posicionamiento institucional.</p>
        </div>
        <div class="interest-item">
            <div class="interest-icon">💻</div>
            <h4>IT</h4>
            <p>Tecnología, desarrollo de sistemas e innovación digital.</p>
        </div>
        <div class="interest-item">
            <div class="interest-icon">🎧</div>
            <h4>Call Center</h4>
            <p>Servicio al cliente y soporte técnico especializado.</p>
        </div>
    </div>
</section>

<!-- Dashboard -->
<section class="dashboard-section">
    
    <!-- Resumen actividad -->
    <div>
        <h3 class="dashboard-title">Resumen de actividad</h3>
        <div class="dashboard-list">
            <div class="dashboard-item">
                <span>Postulaciones activas:</span>
                <span class="dashboard-number">3</span>
            </div>
            <div class="dashboard-item">
                <span>Entrevistas programadas:</span>
                <span class="dashboard-number">1</span>
            </div>
            <div class="dashboard-item">
                <span>Alertas nuevas:</span>
                <span class="dashboard-number">2</span>
            </div>
        </div>
    </div>

    <!-- Promo Box -->
    <div class="promo-box">
        <div class="promo-top-img">
            <h3>Mantente conectado</h3>
        </div>
        <div class="promo-body">
            <p>Actualiza tu perfil regularmente para recibir oportunidades que se adapten a tu experiencia, competencias y objetivos profesionales.</p>
            <div class="promo-icons">
                <div class="promo-icon-item">
                    <div class="promo-icon-circle">👤</div>
                    Actualiza<br>tu perfil
                </div>
                <div class="promo-icon-item">
                    <div class="promo-icon-circle">🔔</div>
                    Recibe<br>oportunidades
                </div>
                <div class="promo-icon-item">
                    <div class="promo-icon-circle">💼</div>
                    Impulsa<br>tu carrera
                </div>
            </div>
        </div>
    </div>

</section>
`;

// --------------------------------------------------------------------------------
// 8. GENERAR pais.html (Claro en tu País - Honduras)
// --------------------------------------------------------------------------------
const countryContent = `
<style>
.country-hero {
    position: relative;
    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
    padding: 80px 24px;
    color: var(--claro-blanco);
}
.country-hero-inner {
    max-width: 1200px;
    margin: 0 auto;
}
.country-badge {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--claro-rojo);
    text-transform: uppercase;
    margin-bottom: 8px;
    display: block;
}
.country-hero h1 {
    font-size: 3rem;
    margin-bottom: 12px;
}
.country-hero h1 span {
    color: var(--claro-rojo);
}
.country-hero p {
    font-size: 1.15rem;
    max-width: 680px;
    margin-bottom: 30px;
}
.country-select-dropdown {
    width: 220px;
    padding: 10px 16px;
    border-radius: var(--borde-radio-pill);
    border: 1px solid var(--claro-gris-borde);
    font-family: var(--fuente-texto);
    font-size: 0.95rem;
    background-color: var(--claro-blanco);
    cursor: pointer;
}

/* Programa Pasantía */
.internship-section {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
}
.internship-inner {
    border: 1px solid var(--claro-rojo);
    border-radius: 24px;
    padding: 48px;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 48px;
    align-items: center;
}
.internship-left h3 {
    font-size: 2.2rem;
    margin-bottom: 20px;
}
.internship-left p {
    color: var(--claro-gris-oscuro);
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 30px;
}
.internship-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.flag-header {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1rem;
    font-weight: 700;
}
.flag-circle {
    font-size: 2.5rem;
}
.internship-img {
    height: 250px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
.internship-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Cultura local */
.local-culture {
    background-color: var(--claro-gris-fondo);
    padding: 80px 24px;
}
.local-culture-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}
.local-culture-left h4 {
    font-size: 0.9rem;
    color: var(--claro-rojo);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
}
.local-culture-left h2 {
    font-size: 2.4rem;
    margin-bottom: 24px;
}
.local-culture-left h2 span {
    color: var(--claro-rojo);
}
.local-culture-left p {
    font-size: 1.05rem;
    color: var(--claro-gris-oscuro);
    line-height: 1.6;
    margin-bottom: 16px;
}

/* Testimonios slider */
.testimonials-section {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}
.testimonials-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 48px;
    flex-wrap: wrap;
}
.testimonial-card {
    background-color: var(--claro-blanco);
    border: 1px solid var(--claro-gris-borde);
    border-radius: var(--borde-radio-card);
    padding: 30px;
    max-width: 320px;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.testimonial-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 16px;
    border: 3px solid var(--claro-rojo);
}
.testimonial-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.testimonial-quote {
    font-size: 0.9rem;
    color: var(--claro-gris-oscuro);
    font-style: italic;
    line-height: 1.5;
    margin-bottom: 16px;
    position: relative;
}
.testimonial-name {
    font-weight: 700;
    font-size: 0.95rem;
}
.testimonial-role {
    font-size: 0.8rem;
    color: var(--claro-gris-texto);
}
.nav-arrow {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--claro-gris-borde);
    background-color: var(--claro-blanco);
    color: var(--claro-rojo);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: var(--transicion);
}
.nav-arrow:hover {
    background-color: var(--claro-rojo);
    color: var(--claro-blanco);
    border-color: var(--claro-rojo);
}

/* Historia local */
.history-section {
    padding: 80px 24px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}
.history-timeline-line {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    margin-top: 60px;
    position: relative;
}
.history-timeline-line::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    height: 3px;
    background-color: var(--claro-rojo);
    z-index: 0;
}
.history-step {
    text-align: center;
    position: relative;
    z-index: 1;
}
.history-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: var(--claro-rojo);
    border: 4px solid var(--claro-blanco);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    margin: 18px auto 20px;
}
.history-step-year {
    font-family: var(--fuente-titulo);
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--claro-negro);
}
.history-step h4 {
    font-size: 0.95rem;
    margin-bottom: 8px;
    color: var(--claro-negro);
}
.history-step p {
    font-size: 0.78rem;
    color: var(--claro-gris-texto);
    line-height: 1.5;
}

@media (max-width: 992px) {
    .internship-inner, .local-culture-inner { grid-template-columns: 1fr; }
    .history-timeline-line { grid-template-columns: 1fr; }
    .history-timeline-line::before { display: none; }
    .history-circle { margin: 10px auto; }
}
</style>

<!-- Hero -->
<section class="country-hero">
    <div class="country-hero-inner">
        <span class="country-badge">Claro en Honduras</span>
        <h1>Conectá tu talento con<br>nuevas <span>oportunidades</span></h1>
        <p>Descubrí cómo vivimos la experiencia Claro en Honduras y conocé una cultura enfocada en el crecimiento, la innovación y las personas.</p>
        <select class="country-select-dropdown" onchange="alert('Simulación: Cambio de país a ' + this.value)">
            <option value="Honduras" selected>Honduras</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="El Salvador">El Salvador</option>
        </select>
    </div>
</section>

<!-- Programa pasantía -->
<section class="internship-section">
    <div class="internship-inner">
        <div class="internship-left">
            <h3>Programa de pasantía</h3>
            <p>Inicia tu carrera donde las ideas se convierten en impacto. Vive una experiencia que te reta, te forma y te conecta con un propósito mayor: transformar vidas a través de la tecnología.</p>
            <a href="registro.html" class="btn-primary">Conoce más... →</a>
        </div>
        <div class="internship-right">
            <div class="flag-header">
                <span class="flag-circle">🇭🇳</span>
                <div>
                    <strong>Honduras</strong>
                    <div style="font-size:0.85rem; font-weight:400; color:var(--claro-gris-texto);">Sumate a nuestro equipo en Honduras y desarrollá tu talento en un entorno de innovación.</div>
                </div>
            </div>
            <div class="internship-img">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" alt="Pasantías">
            </div>
        </div>
    </div>
</section>

<!-- Cultura Local -->
<section class="local-culture">
    <div class="local-culture-inner">
        <div class="local-culture-left">
            <h4>Nuestra Cultura Local</h4>
            <h2>Así vivimos Claro en <span>Honduras</span></h2>
            <p>Creemos en una cultura donde vos podés crecer, aprender y desarrollar tu talento en un ambiente colaborativo y enfocado en las personas.</p>
            <p>Promovemos espacios donde las ideas, el trabajo en equipo y el bienestar generan experiencias que impulsan tu desarrollo profesional.</p>
        </div>
        <div class="video-wrapper">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Cultura Honduras">
            <div class="video-play-btn" onclick="alert('Simulación: Reproducción de video de Claro Honduras')">▶</div>
        </div>
    </div>
</section>

<!-- Testimonios / Personas que inspiran -->
<section class="testimonials-section">
    <div class="section-header">
        <span style="font-size:0.9rem; font-weight:700; color:var(--claro-rojo); text-transform:uppercase;">Historias de Nuestra Gente</span>
        <h2 style="font-size:2.4rem; margin-top:8px;">Personas que inspiran</h2>
        <p style="color:var(--claro-gris-texto); font-size: 0.95rem; margin-top:8px;">Conocé historias reales de colaboradores que encontraron oportunidades, crecieron profesionalmente y hoy forman parte de la experiencia Claro.</p>
    </div>
    
    <div class="testimonials-grid">
        <div class="nav-arrow">❮</div>
        
        <!-- Testimonio 1 -->
        <div class="testimonial-card">
            <div class="testimonial-avatar">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" alt="Anderson Vinicio">
            </div>
            <p class="testimonial-quote">"Entré buscando una oportunidad y encontré un lugar para crecer profesionalmente."</p>
            <div class="testimonial-name">Anderson Vinicio</div>
            <div class="testimonial-role">Gerente de Ventas</div>
        </div>
        
        <!-- Testimonio 2 (Activo) -->
        <div class="testimonial-card" style="border-color: var(--claro-rojo); box-shadow:0 8px 30px rgba(0,0,0,0.08);">
            <div class="testimonial-avatar" style="border-width:4px;">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" alt="Manuel Calán">
            </div>
            <p class="testimonial-quote">"En Claro descubrí nuevos retos y oportunidades para desarrollar mi carrera técnica."</p>
            <div class="testimonial-name">Manuel Calán</div>
            <div class="testimonial-role">Gerente de Producción</div>
        </div>

        <!-- Testimonio 3 -->
        <div class="testimonial-card">
            <div class="testimonial-avatar">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" alt="Nathaly Batz">
            </div>
            <p class="testimonial-quote">"Claro que me gusta trabajar aquí, he acumulado muy buenas experiencias con mi equipo."</p>
            <div class="testimonial-name">Nathaly Batz</div>
            <div class="testimonial-role">Gerente de Marketing</div>
        </div>

        <div class="nav-arrow">❯</div>
    </div>
</section>

<!-- Nuestra historia -->
<section class="history-section" style="background-color: var(--claro-gris-fondo);">
    <h2 style="font-size:2.2rem; margin-bottom:12px;">Nuestra historia</h2>
    <p style="color:var(--claro-gris-oscuro); max-width:800px; margin:0 auto; font-size:0.95rem; line-height:1.6;">
        <strong>Somos Claro Honduras</strong> y formamos parte de América Móvil, uno de los grupos de telecomunicaciones más importantes de Latinoamérica. Desde nuestra llegada al país, trabajamos para conectar personas, impulsar la innovación y acercar nuevas oportunidades a millones de hondureños mediante tecnología y servicios que transforman vidas.
    </p>
    
    <div class="history-timeline-line">
        <div class="history-step">
            <div class="history-step-year">2003</div>
            <div class="history-circle"></div>
            <h4>Iniciamos operaciones</h4>
            <p>Comenzamos nuestro camino en el país como Megatel, llevando nuevas alternativas de conectividad.</p>
        </div>
        <div class="history-step">
            <div class="history-step-year">2006</div>
            <div class="history-circle"></div>
            <h4>Nace Claro en Honduras</h4>
            <p>La marca Claro llegó oficialmente a Honduras como parte de la unificación regional de América Móvil.</p>
        </div>
        <div class="history-step">
            <div class="history-step-year">2008</div>
            <div class="history-circle"></div>
            <h4>Lanzamos tecnología 3G</h4>
            <p>Fuimos pioneros en llevar servicios móviles de tercera generación, impulsando experiencias digitales.</p>
        </div>
        <div class="history-step">
            <div class="history-step-year">2015</div>
            <div class="history-circle"></div>
            <h4>Red 4G LTE</h4>
            <p>Continuamos evolucionando nuestra infraestructura para brindar una mejor experiencia y mayor velocidad.</p>
        </div>
        <div class="history-step">
            <div class="history-step-year">2023</div>
            <div class="history-circle"></div>
            <h4>20 años conectando</h4>
            <p>Celebramos dos décadas impulsando la conectividad, innovación y compromiso con el desarrollo del país.</p>
        </div>
        <div class="history-step">
            <div class="history-step-year">hoy</div>
            <div class="history-circle"></div>
            <h4>Seguimos conectando</h4>
            <p>Continuamos innovando para acercar personas, impulsar talento y construir el futuro digital de Honduras.</p>
        </div>
    </div>
</section>

<!-- CTA local -->
<section class="cta-bottom" style="background: linear-gradient(135deg, #1C1C1C 0%, #000000 100%);">
    <div class="cta-bottom-inner">
        <h2>Tu próxima oportunidad puede estar acá</h2>
        <p>Da el siguiente paso y encontrá un lugar donde vos podás crecer y desarrollar tu potencial.</p>
        <div style="display:flex; justify-content:center; gap:16px;">
            <a href="registro.html" class="btn-primary">Iniciar sesión</a>
            <a href="registro.html" class="btn-secondary" style="border-color:var(--claro-blanco) !important; color:var(--claro-blanco) !important;">Crear Perfil</a>
        </div>
    </div>
</section>
`;

function main() {
    console.log('Iniciando generación de páginas con el diseño de Claro...');

    // Escribir los 7 archivos HTML
    fs.writeFileSync(path.join(WORKSPACE, 'index.html'), getLayout('Inicio', homeContent, 'inicio', false), 'utf-8');
    console.log('index.html generado exitosamente.');

    fs.writeFileSync(path.join(WORKSPACE, 'busqueda.html'), getLayout('Vacantes', searchContent, 'vacantes', false), 'utf-8');
    console.log('busqueda.html generado exitosamente.');

    fs.writeFileSync(path.join(WORKSPACE, 'cultura.html'), getLayout('Nuestra Esencia', cultureContent, 'cultura', false), 'utf-8');
    console.log('cultura.html generado exitosamente.');

    fs.writeFileSync(path.join(WORKSPACE, 'beneficios.html'), getLayout('Beneficios', benefitsContent, 'cultura', false), 'utf-8');
    console.log('beneficios.html generado exitosamente.');

    fs.writeFileSync(path.join(WORKSPACE, 'apoyo.html'), getLayout('Apoyo al Candidato', supportContent, 'apoyo', false), 'utf-8');
    console.log('apoyo.html generado exitosamente.');

    fs.writeFileSync(path.join(WORKSPACE, 'registro.html'), getLayout('Únete a la Comunidad de Talento', registerContent, 'vacantes', false), 'utf-8');
    console.log('registro.html generado exitosamente.');

    fs.writeFileSync(path.join(WORKSPACE, 'perfil.html'), getLayout('Mi Perfil', profileContent, '', true), 'utf-8');
    console.log('perfil.html generado exitosamente.');

    fs.writeFileSync(path.join(WORKSPACE, 'pais.html'), getLayout('Claro en tu País', countryContent, 'pais', false), 'utf-8');
    console.log('pais.html generado exitosamente.');

    console.log('Proceso de compilación de Claro finalizado con éxito.');
}

main();
