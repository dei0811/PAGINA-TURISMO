// tour-points.js - Script para puntos turísticos interactivos

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si existen los elementos en la página
    const tourPoints = document.querySelectorAll('.tour-point');
    const imageDisplay = document.querySelector('.image-display');
    
    if (tourPoints.length === 0 || !imageDisplay) {
        console.log('Elementos de puntos turísticos no encontrados en esta página');
        return;
    }

    const displayedImage = document.getElementById('displayed-image');
    const imageTitle = document.getElementById('image-title');
    const imageDescription = document.getElementById('image-description');
    const closeBtn = document.querySelector('.close-image');

    // ===== FUNCIONES PRINCIPALES =====
    
    // Abrir imagen con los datos del punto turístico
    function openImageDisplay(point) {
        // Remover clase active de todos los puntos
        tourPoints.forEach(p => p.classList.remove('active'));
        
        // Agregar active al punto clickeado
        point.classList.add('active');
        
        // Obtener datos del punto turístico
        const imageSrc = point.getAttribute('data-image');
        const title = point.getAttribute('data-title');
        const description = point.getAttribute('data-description');
        
        // Validar que la imagen exista antes de mostrarla
        const img = new Image();
        img.onload = function() {
            // Mostrar imagen
            displayedImage.src = imageSrc;
            displayedImage.alt = title;
            imageTitle.textContent = title;
            imageDescription.textContent = description;
            
            // Mostrar display
            imageDisplay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        
        img.onerror = function() {
            // Si la imagen no carga, mostrar una imagen de respaldo
            displayedImage.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop';
            displayedImage.alt = 'Imagen de Cartagena - Default';
            imageTitle.textContent = title || 'Punto turístico';
            imageDescription.textContent = description || 'Imagen no disponible temporalmente';
            
            // Mostrar display igualmente
            imageDisplay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            console.warn(`No se pudo cargar la imagen: ${imageSrc}`);
        };
        
        img.src = imageSrc;
    }

    // Cerrar el display de imagen
    function closeImageDisplay() {
        imageDisplay.classList.remove('active');
        document.body.style.overflow = 'auto';
        tourPoints.forEach(p => p.classList.remove('active'));
    }

    // Precargar imágenes para mejor experiencia
    function preloadImages() {
        console.log('Precargando imágenes de puntos turísticos...');
        const images = [];
        
        tourPoints.forEach(point => {
            const imageSrc = point.getAttribute('data-image');
            if (imageSrc) {
                const img = new Image();
                img.src = imageSrc;
                images.push(img);
            }
        });
        
        return images;
    }

    // ===== EVENT LISTENERS =====
    
    // Agregar evento a cada punto turístico
    tourPoints.forEach(point => {
        point.addEventListener('click', function() {
            openImageDisplay(this);
        });
        
        // Opcional: Agregar soporte para teclado (accesibilidad)
        point.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageDisplay(this);
            }
        });
    });

    // Cerrar imagen con el botón ×
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageDisplay);
    }

    // Cerrar al hacer clic fuera de la imagen
    imageDisplay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageDisplay();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageDisplay.classList.contains('active')) {
            closeImageDisplay();
        }
    });

    // ===== INICIALIZACIÓN =====
    
    // Hacer los puntos accesibles por teclado
    tourPoints.forEach(point => {
        point.setAttribute('tabindex', '0');
        point.setAttribute('role', 'button');
        point.setAttribute('aria-label', 'Ver imagen de ' + point.querySelector('.point-text').textContent);
    });
    
    // Precargar imágenes (opcional, mejora la experiencia)
    preloadImages();
    
    console.log('Script de puntos turísticos cargado correctamente');
});