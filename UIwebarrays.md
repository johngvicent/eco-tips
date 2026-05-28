# Purpose

This file is to remind me the web components that inspired me to design the UI components for EcoTips

# Buttons

https://codepen.io/JavaScriptJunkie/pen/pPRooV ** Gradient Button Hover

https://codepen.io/monkey-company/pen/zZZvRp ** Gradient text border background Button With Animation

## 1. Tipos de botones según su jerarquía

   A. Botón Primario (CTA Principal): Es el botón más importante de la página. Atrae la atención del usuario inmediatamente para realizar la acción clave (ej. "Comprar ahora", "Registrarse"). Solo debe haber uno visible a la vez por pantalla. 
    B. Botón Secundario: Acompaña al botón primario para ofrecer una alternativa menos importante (ej. "Cancelar" al lado de "Guardar", o "Saber más" al lado de "Comprar"). Suele tener un diseño con borde (outline) o un color más tenue. 
    C. Botón Terciario: Se utiliza para acciones de baja prioridad o secundarias dentro de un contexto (ej. "Editar", "Ver detalles"). Normalmente se diseña como un texto subrayado o un enlace con aspecto de botón para no competir visualmente. 
    D. Botón de Icono (Icon Button): No lleva texto, solo un símbolo gráfico (ej. el icono de un carrito de compras, una papelera para eliminar o una lupa para buscar). Es ideal para interfaces compactas o barras de herramientas. 

## 2. Botones para casos especiales

    F. Botón de Destrucción (Peligro): Se usa para acciones irreversibles o peligrosas (ej. "Eliminar cuenta", "Borrar archivo"). Debe ir en color rojo para advertir al usuario y evitar errores catastróficos. 
    G. Botón de Alternancia (Toggle Button): Cambia entre dos estados o activa/desactiva una opción (ej. cambiar entre modo claro/oscuro, o seleccionar "Favorito" con una estrella).

## 3. Los 5 estados obligatorios que debes diseñar

Cada uno de los tipos anteriores (especialmente los tres primeros) debe tener definidos cinco estados visuales en tu sistema de diseño para ofrecer un buen feedback al usuario:
    A. Normal (Rest): El botón en su estado inicial, listo para ser pulsado.
    B.Hover (Pasar el ratón): Cambia ligeramente de color o brillo cuando el cursor del ratón se posiciona encima. Indica que es un elemento interactivo.
    C. Focus (Enfoque): Se activa al navegar con el teclado (tecla Tab). Suele mostrar un borde exterior resaltado. Es fundamental para la accesibilidad web.
    D. Pressed/Active (Presionado): El cambio visual justo en el momento en que el usuario hace clic o presiona la pantalla. Da la sensación física de hundimiento.
    E. Disabled (Deshabilitado): Se muestra opaco o gris cuando la acción no está disponible todavía (ej. el botón "Enviar" antes de rellenar un formulario obligatorio). No reacciona a los clics.

