<a name="readme-top"></a>
# Kane Web
https://kane-2023.web.app/
## Tabla de contenidos

1. [Ejecución del proyecto](#markdown-header-ejecucion-del-proyecto)
2. [Introducción](#markdown-header-introduccion)
3. [Equipos](#markdown-header-listado-de-equipos-y-miembros-de-los-equipos)
4. [Descripción del sistema](#markdown-header-descripcion-general)

    4.1 [Contexto y situación actual](#markdown-header-contexto-actual)

    4.2 [Problema que resuelve](#markdown-header-problema-que-resuelve)

    4.3 [Interesados del proyecto y tipos de usuarios](#markdown-header-interesados-del-proyecto-y-tipos-de-usuarios)

    4.4 [Solución propuesta](#markdown-header-solucion-propuesta)

    4.5 [Análisis del entorno](#markdown-header-analisis-del-entorno)

    4.6 [Visión del producto](#markdown-header-vision-del-producto)

    4.7 [Relación con otros sistemas externos](#markdown-header-relacion-con-otros-sistemas-externos)

    4.8 [Descripción de los sistemas](#markdown-header-descripcion-de-los-temas-modulos-asignados-a-cada-equipo)

    4.9 [Requerimientos funcionales](#markdown-header-requerimientos-funcionales)

    4.10 [Mapa de ruta del producto](#markdown-header-mapa-de-ruta-del-producto)

    4.11 [Requerimientos no funcionales](#markdown-header-requerimientos-no-funcionales-que-debe-cumplir-toda-la-aplicacion-web)

5. [Decisiones técnicas](#markdown-header-decisiones-tecnicas)

    5.1 [Metodologías utilizadas y procesos definidos](#markdown-header-metodologias-utilizadas-en-el-desarrollo-del-proyecto)

    5.2 [Artefactos utilizados en el desarrollo del proyecto](#markdown-header-artefactos-utilizados-en-el-desarrollo-del-proyecto)

    5.3 [Tecnologías utilizadas con sus respectivas versiones](#markdown-header-tecnologias-utilizadas-con-sus-respectivas-versiones)

    5.4 [Repositorio de código y estrategia git para el proyecto](#markdown-header-repositorio-de-codigo-y-estrategia-git-para-el-proyecto)

    5.5 [Definición de listo](#markdown-header-definicion-de-listo)

6. [Referencias bibliográficas](#markdown-header-referencias-bibliograficas)

## Ejecución del proyecto

Para ejecutar el proyecto es necesario seguir los siguientes pasos:
1. Descargar el repositorio de [GitHub](https://github.com/gatitolabs/Kane-web-2023)
2. Instalar extensiones de VSCode: Prettier - Code Formatter v9.10.4 y ESLint v2.4.0 
3. Instalar el manejador de paquetes yarn con el siguiente comando: npm install --global yarn
4. Abrir una terminal en el proyecto y correr los siguientes comandos:
    * cd src 
    * cd kane_web
    * npm install --global yarn (Si ya tienen instalado yarn pueden brincarse este paso)
    * Si se produce este error: "yarn : No se puede cargar el archivo C:/"Ruta_del_repo" porque la ejecución de scripts está deshabilitada" debe ejecutar este comando en el PowerShell (con permisos de administrador): **Set-ExecutionPolicy RemoteSigned -Scope CurrentUser**
    * yarn
    * yarn dev
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Introducción

Este documento especifica la organización entre los equipos de trabajo del proyecto, cada uno de los roles de cada miembro, al igual que las decisiones técnicas para el desarrollo del proyecto. Se estructura en tres secciones principales: **Listado de equipos, Descripción general del proyecto y Decisiones técnicas** .
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Listado de equipos y miembros de los equipos

### Equipo 3A/3D

* Sofia Campos
* Alejandro Ramírez
* Darío Matamoros
* Kevin Salas
* Daniela Murillo

### Los Pollos Hermanos

* Andrés Azofeifa
* Rodrigo Piedra
* José Rodríguez
* Gabriel Zúñiga
* David Rojas
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Descripción general

### Contexto actual

La cooperativa de taxistas Kane Taxi se trata de un grupo de mujeres taxistas que buscan ofrecer sus servicios a más personas, de una forma moderna y eficiente.

### Problema que resuelve

Debido a la falta de plataformas para prestar este servicio de forma más atractiva para los clientes, las taxistas se han propuesto crear cuatro módulos o aplicaciones en conjunto con la ECCI y sus estudiantes. Estas cuatro aplicaciones buscan aumentar el tráfico de clientela que las taxistas reciben y ayudar a administrar mejor las operaciones de la cooperativa.

### Interesadas en el proyecto y tipos de usuarios
Las principales interesadas en el proyecto son las taxistas pertenecientes a la cooperativa. 

Como tipos de usuarios podemos identificar, en nuestro caso, a las controladoras que se encargan de aprobar a nuevas conductoras, generar reportes y atender llamadas de pánico, entre otras funciones. 

Es importante aclarar que la página Kane Web tendrá muy pocas usuarias, ya que una controladora puede manejar a muchas taxistas.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Solución propuesta

Desarrollar una aplicación web que permita administrar la información de las taxistas pertenecientes a la cooperativa, así como la información básica de la cooperativa. 

### Análisis del entorno.
- *Requerimientos del usuario:* 
    - El sistema permite acceder a la información de la cooperativa.
    - El sistema permite acceder a la información de las taxistas.
    - El sistema muestra la información de manera ordenada. 
    - El sistema permite el filtrado de información. 
    - La información presentada está actualizada al día. 
    - El sistema permite aprobar o desactivar cuentas de taxistas.
    - El sistema muestra notificaciones en caso de tener una llamada de emergencia.

- *Competidores:*
    - Competidores externos: 
        - Empresas desarrolladoras de software.
        - Desarrolladores independientes. 
 

### Visión del producto

Para las mujeres taxistas pertenecientes a la cooperativa de Kane Taxi, la plataforma **Kane Web** es una aplicación web que les permitirá la administración de las conductoras y de la cooperativa.
De forma distinta a las aplicaciones de servicios públicos o privados, nuestro producto proveerá un sitio web simple de usar, con funciones personalizadas de acuerdo a las necesidades de la cooperativa que permitirá facultar las tareas de la controladora.

### Relación con otros sistemas externos

El sitio Kane Web se relaciona con las operaciones de dos sistemas diferentes, que están, de la misma forma, bajo desarrollo con otros equipos del mismo curso. Estos sistemas son los siguientes:

* **Kane Taxi:** esta es una aplicación móvil que será usada por las taxistas de la operativa. A través de esta aplicación, las taxistas pueden subir sus documentos, recibir viajes y realizar cobros. 
* **Kane Customer:** esta aplicación móvil  será usada por las y los clientes para solicitar viajes. 

### Requerimientos funcionales

Los requerimientos funcionales se administran por medio de la herramienta de **JIRA** el cual puede ser accedido con los debidos permisos del administrador del proyecto.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Requerimientos no funcionales que debe cumplir toda la aplicación web.

* El sistema será desarrollado para navegadores web basados en Chromium y Gecko (Firefox).

* **Eficiencia:**

    * Toda la funcionalidad del sistema debe ser capaz de responder en menos de 10 segundos.
    * Los datos que se modifican deben ser actualizados en la base de datos para todos los usuarios en menos de 2 segundos. 

* **Usabilidad:**

    * El sistema debe proporcionar mensajes de error que sean informativos y orientados a usuario final.
    
    * El sistema debe poseer interfaces gráficas bien formadas.

    * El tiempo de aprendizaje del sistema por un usuario deberá ser menor a 4 horas.

* **Seguridad:**

    * El sistema se debe desarrollar aplicando recomendaciones de programación que mantengan la seguridad de los datos.
    
    * Los datos solo podrán ser modificados por el administrador del sistema o miembro con los permisos correspondientes a su rol.

* **Organización:**
    * Cada semana se debera producir reportes de las reuniones diarias en los cuales cada equipo muestre los avances del proyecto.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Decisiones técnicas

Clean code: la especificación definida por los equipos desarrolladores se encuentra en:  [Código Limpio](https://github.com/airbnb/javascript/tree/master/react)

Arquitectura limpia: para la realización de este proyecto se trabajó en la arquitectura limpia de tipo MVC (Modelo Vista Controlador). Para ver más sobre el diseño de la arquitectura puede dirigirse a la carpeta "design" despúes a la carpeta "png" y revisar la imagen Kane-web - Arquitectura.png

**Modelo:**

En el modelo se encontraran las implementaciones específicas de cada módulo de la aplicación con la siguiente estructura de carpetas: 
1. Carpeta padre de un módulo en específico donde se encuentra la implementación y reglas de negocio del módulo particular.
2. Carpeta entities donde se encuentra la clase y/o interfaz relacionadas con el módulo en específico.
3. Carpeta services donde se encontrarán validaciones y reglas del negocio.

**Controlador:**

El controlador tiene la responsabilidad de responder con los datos y funcionalidades del modelo a la vista. Es un mediador entre la vista y el modelo.
Estructura de carpetas:
1. Carpeta padre de un módulo en específico donde se encuentra el controlador de una entidad particular.

**Vista:**

La vista es la encargada de mostrar la interfaz del usuario así como las entradas que el usuario quiera ingresar. 
1. Carpeta shared donde se encontraran carpetas con componentes, hooks personalizados () y el estilo CSS, los cuales se utilizarán en varias partes de la interfaz.
2. Carpeta de un módulo en específico donde se encontrarán la vista(páginas rsx) y los estilos del módulo en específico (css). 
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Metodologías utilizadas y procesos definidos

**Metodología ágil Scrum:**
Scrum es un marco de gestión para el desarrollo incremental de productos, valiéndose de uno o más equipos multifuncionales, autoorganizados, de aproximadamente siete personas cada uno. 
Estos equipos son responsables de la creación y adaptación de los procesos mediante una estructura de roles, reuniones, reglas, y artefactos para el trabajo en equipo que Scrum posee.
En Scrum se realizan entregas parciales y regulares del producto final, priorizadas por el beneficio que aportan al receptor del proyecto.
El mayor beneficio de la metodología Scrum se experimenta en el trabajo complejo que implica la creación de conocimiento y colaboración.

**Reuniones**: Se decide realizar por lo menos una reunión semanal, con el objetivo de conocer los avances, problemas y sidebar topics que enfrenta cada equipo en el desarrollo de sus módulos. 

**Reglas**: Cada equipo es responsable de las reglas bajo las que se trabaja. Pero en conjunto todos deben cumplir con los requisitos de clean code, arquitectura limpia y definición de acordados.

**Backlog**: Cada equipo cuenta con un backlog de prioridades donde se almacenan las historias de usuario de acuerdo a su importancia.

### Artefactos utilizados en el desarrollo del proyecto.

Se realizaron los siguientes artefactos para el diseño:

* [Modelo conceptual de la aplicación web](https://lucid.app/lucidchart/407524d4-f972-47a6-8ef5-fd783963cc40/edit?invitationId=inv_5b3b93d5-dca7-49a9-8a02-366d199cbde3&page=0_0#)
* [Modelo conceptual y relacional base de datos](TODO)

### Tecnologías utilizadas con sus respectivas versiones

* React v 18.2
* Firebase (SDK 7.20.0)
* Bootstrap version 5
* HTML 5 y CSS 3
<p align="right">(<a href="#readme-top">back to top</a>)</p>
### Repositorio de código y estrategia git para el proyecto

El código del proyecto se encuentra en un [repositorio de GitHub](https://github.com/gatitolabs/Kane-web-2023)

Dado que se utilizó la metolodía ágil Scrum, se definió que se utilizaría una rama **main** de la cual se crea una rama por cada equipo de acuerdo a sus modúlos.
En cada subrama de equipo se crea una subrama por cada historia de usuario definida por los equipos. 

Para ver más sobre el diseño de flujo de git puede dirigirse a la carpeta "design" despúes a la carpeta "png" y revisar la imagen Kane-web - Git.png

### Definición de listo

#### Para subir al master:
 
* No romper la arquitectura.
* Tiene que completar una tarea técnica.
* Comentario explicando algo en el código que se considere complicado.
* Si se hace un cambio a los modelos se debe de hacer un pull request a los otros equipos.
* Seguir principios de clean code básico.
* Verificar que corra.
* Todas las tareas de integración deben tener pull requests entre los equipos involucrados.

#### Para presentar en el Sprint Review	estar en el master y actualizado en el backlog

* Tiene que estar cumpliendo los criterios de aceptación.
* Tiene que haber sido revisada y aprovada por el P.O. 
<p align="right">(<a href="#readme-top">back to top</a>)</p>
