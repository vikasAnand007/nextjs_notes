# Metadata
Metadata can be set by

 - Exporting a static **metadata** object.
 - Exporting a dynamic **generateMetadata** function (this function can be asynchronous also, if we want to fetch some data through api)

From **page.tsx** or **layout.tsx** at any level of folder structure.

> Components marked with "use client" cannot do this.

**Priority order**

 1. **page.tsx** has higher priority then **layout.tsx**
 2. More the level of nesting , more the priority

# Project organising tips
## File colocation
Components which are **default** **exported** from **page.js** or **page.tsx** are rendered in browser
## private routes
Folders (and their sub-folders) named with prefix **`_`** or **`%5F`** are not delivered to browsers.
**Example:** 

    |-dashboard
    |	-page.tsx
    |-about
    |	-page.tsx
    |-_components
    |	-page.tsx
    |-%5Futils
    |	-page.tsx

here, **http://localhost:3000/_components** or **http://localhost:3000/%5Futils** will render 404page

## route groups
Folders name wrapped with `()` are not taken as route segment
**Example**

    |-dashboard
    |	-page.tsx
    |-(auth)
    |	-login
    |		-page.tsx
    |	-signup
    |		-page.tsx
    |-page.tsx
here, route of login page will be **http://localhost:3000/login**  instead of **http://localhost:3000/(auth)/login** . Also the signup page.

## layout groups
We can make use of route groups to group some routes in a single layout
**Example**

    |-dashboard
    |	-page.tsx
    |-(auth)
    |	-layout.tsx [groupped layout]
    |	-login
    |		-page.tsx
    |		-layout.tsx [nested layout]
    |	-signup
    |		-page.tsx
    |		-layout.tsx [nested layout]
    |-page.tsx
    |-layout.tsx [root layout]
    
here, **groupped layout** will be shared by both **http://localhost:3000/login** and **http://localhost:3000/signup** as a wrapper around **nested layout**

# Link component

## replace 

    <Link href="/dashboard" replace>Dashboard<Link>
This will replace the top entry in history stack with "**/dashboard**"

# useRouter()

    const router = useRouter();

###  router.back()
To go 1 level **down** in history stack
###  router.forward()
To go 1 level **up** in history stack
###  router.replace("/some-route")
To **replace** the top entry of history stack with "**/some-route**"
###  router.push("/some-route")
To **push** the route "**/some-route**"  in  history stack.

# layout v/s template
|layout| template |
|--|--|
| if two pages share the same layout then, When the page is changed the layout component will only re-render the changed children i.e, page and the layout component itself will not be re-rendered (if not done intentionally) | if two pages share the same template then, When the page is changed both page and template component itself will re-render |

We can use both **layout.tsx** and **template.tsx** in a route. In that case, **page.tsx** will render inside **template.tsx** and **template.tsx** will render inside **layout.tsx**

## loading.tsx

 - This file is rendered in between (until the page content is loaded), when we navigate between two routes.
 - This also follows the **layout.tsx** type hierarchy. *Example*: If **loading.tsx** is kept in parent folder of a nested routes, then it will be shown for all the routes that are nested under that folder. Priority order will also be same as **layout.tsx**.

## error.js
This makes a error boundary across the **page.tsx**. If page.tsx has error, then instead of crashing the application, the error will be catched by **error.tsx** and a fallback UI will be rendered on DOM.
This also follows the **layout.tsx** type hierarchy. **error.tsx** in parent will work for all the nested routes under that folder.

Levels of files (in a folder) - *parent to child*
`layout.tsx` -> `template.tsx` -> `error.tsx` -> `loading.tsx` -> `error.tsx` -> `page.tsx`

### Resetting the error

default component in error.js file also receives a "**reset**" function, which reloads the page.tsx. This may be helpful if re-loading the page.tsx could resolve the error.

*Since layout.tsx is rendered as a parent of error.tsx the error occured in layout.tsx is not handled by error.tsx (in the same folder). In this case the error will be cought by the one which is located in the uper level of folder hierarchy.*

## Slots / parallel-routes
These are the folders, whose name is prefix with `@`symbol, and has the ability to be rendered at a same route and be passed at a same `layout.tsx` as a prop.
***Example:***
	

    |-layout.tsx
    |-page.tsx
    |-@section1
    |	-page.tsx
    |-@section2
    |	-page.tsx
    |-@section2
    |	-page.tsx
        
in **layout.tsx**

    export default function Layout({
      children,
      section1,
      section2,
      section3,
    }: {
      children: React.ReactNode;
      section1: React.ReactNode;
      section2: React.ReactNode;
      section3: React.ReactNode;
    }) {
      return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {section1}
            {children}
            {section2}
          </div>
          <div>{section3}</div>
        </div>
      );
    }

 - A clear benefit of parallel-routes is their ability to split a single layout into multiple slots, making the code more manageable.
 - A parallel route behaves same as a normal route. It can have it's own "**error**", "**loading**", "**layout**", "**template**" or other files that a normal route has, and would behave normally as expected.
 - Each **slot/ parallel-route** can essentially function as a mini application, complete with it's own navigation and state management.

**Example:**

    |-layout.tsx
    |-page.tsx
    |-child
    |	-page.tsx
    |-@section1
    |	-page.tsx
    |	-child
    |		-page.tsx
    |-@section2
    |	-page.tsx
    |-@section2
    |	-page.tsx

*Here the two slots "section1" and "children" (i.e, page.tsx of root level) have nested route which is "/child". So, at the rote "/child" the "section1" and "children" will be replaced by the corresponding nested route but "section2" and "section3" will remain same as before because they do not have "child" nested page under them.* 

*In this case if we reload the browser at "/child" route, next.js will search for the "child" route in all the slots at that level, and if any slot fail to provide that route then next.js will render a 404 page for the whole "/child" route.*

*To handle this scenario we need to define "default.tsx" file in "section2" and section3" slot.  This will be rendered as a fallback if no route is matched under the slot.*

**Example**:
  

	    |-layout.tsx
        |-page.tsx
        |-child
        |	-page.tsx
        |-@section1
        |	-page.tsx
        |	-child
        |		-page.tsx
        |-@section2
        |	-page.tsx
        |	-default.tsx
        |-@section2
        |	-page.tsx
        |	-default.tsx

## Intercepting routes ??
Didn't find useful as of now! please study at below link if needed.
[https://www.youtube.com/watch?v=nr_kRfTJfKc](https://www.youtube.com/watch?v=nr_kRfTJfKc)

# Route handlers --------------------------

 - Next JS has builtin support for handling API routes. 
 - For this we need to write our API login in file named `route.ts`
 - The path of **route.ts** is defined in same manner as of **page.ts**, and it supports all the above features and conventions related to folder structure.
 - if a folder contains both **page.ts** and **route.ts** then **route.ts** will given priority.

## HTTP methods in next route handlers
in route.ts file we can use `GET()`, `POST()`, `PATCH()`, `DELETE()` methods to make appropriate API route.

### redirects in route handlers
We can also use `redirect()` method in route.ts to perform redirects to any page or route within the application.

## Reading/Setting headers and routes in route handlers

    import { NextRequest } from "next/server";
    import { headers, cookies } from "next/headers";
    
    export async function GET(request: NextRequest) {
      // READING HEADERS ##################################
    
      // METHOD 1 -----------------------------------------
      // const requestHeaders = new Headers(request.headers);
      // const auth = requestHeaders.get("Authorization");
      // const themeCookie = request.cookies.get("theme");
    
      // METHOD 2 -----------------------------------------
      const requestHeaders = headers();
      const auth = requestHeaders.get("Authorization");
      const themeCookie = cookies().get("theme");
    
      console.log("header data", {
        auth,
        themeCookie,
      });
    
      // SETTING HEADERS ##################################
    
      // SETTING COOKIE #1 --------------------------------
      // cookies().set("theme", "dark");
    
      return new Response("<h1>setting headers<h1/>", {
        headers: {
          "Content-Type": "text/html",
          "Set-Cookie": "theme=dark",
        },
      });
    }

## API caching in route handlers
in production build `GET()` methods are cached by default. To disable this feature we can use `export  const  dynamic  =  "force-dynamic";`at top of the code.

Example:

    export const dynamic = "force-dynamic";
    
    export async function GET() {
      return Response.json({
        time: new Date().toLocaleTimeString(),
      });
    }

## Middleware
Middleware in Next JS is a powerful feature that offers a robust way to intercept and control the flow of requests and responses in your application.

It does this at a global level significantly enhancing feature like redirection, URL rewrites, authentication, headers and cookie management and more.

**See `middleware.ts` in code for more help**
# Rendering
## CSR (client side rendering)
In CSR, we do not directly send HTML node to the browser. But, we send a bundle of JavaScript code to the browser. This JS code runs in the browser and then generates HTML node over there.
 **Pros**
 - Good for SPA (Single Page Application). As the whole JS bundle is transferred at once, the client doesn't request the server again and again for different pages. All the changes in DOM is generated by JS itself. Hence no reloading of page is required.

**Cons**
 - Bad in SEO (Search engine optimisation). Search engines looks for content to be indexed for SEO ranking. But in CSR they do not get any content, but a bunch of JS code.
 - Each new feature added in the application, increases the size of the JS bundle. Which increases the wait time for users to see the UI.
## SSR (Server side rendering)
In SSR, the HTML node is generated on the server itself and then transferred to the browser. 
**Pros of SSR**
 - Since HTML node is already generated on server, the time consumed in generating it on browser is eliminated. Hence, it **reduces the initial load time**.
 - Instead on JS code, Search engines get real content for indexing. Hence, it is **good for SEO**

However, the HTML node generated in SSR is not fully user interactive because the browser specific APIs which is only present on browser, do not get implemented in it. 

So, to make is fully interactive next.js does **hydration**.


### In Hydration

- A bunch of JS code is also passed from behind after the server generated HTML is initially rendered.
- After this React takes control in the browser and reconstruct the DOM tree from start to finish by binding necessary JS logic to the required elements.

**Note**
- For successful hydration, the current component tree in browser during hydration must exactly match the server-generated component tree which was received at the request.

  
  

**Cons of SSR**

  

- If there is any data fetching or any time taking task that must be completed before the server can begin generating HTML then it may result in initial load time.

- The JavaScript required for hydration of the components needs to be fully loaded on the browser before the hydration process can start.

- All components have to be hydrated before they become interactive.

*The above three cons of SSR **[having to load all the data for entire page,  Load the JS for entire page, Hydrate the entire page]** in next.js is also known as "**All Or Nothong Waterfall**"*

## SSG (Static site generation)

SSG results in pages that are already rendered and ready to server. It occurs at the build time (static pages are generated in build folder which is served as it is when requested).

It is ideal for the pages whose content do not change very often.

## Solution for "All Or Nothing Waterfall"
To solve **All or nothing waterfall** React **18** introduced **Suspense SSR Architecture**. I consists of two phases.

 1. HTML Streaming on the server
 2. Selective hydration on the client.

### HTML Streaming on the server
Instead of sending all the HTML of page at once, We have an option to wrap a part of page's HTML in a **Suspense** component. Suspense component has a fallback which will rendered as aplaceholder until the original content in Suspense is loaded.

With help of this, The component wrapped in **Suspense** is left and remaining content is streamed on browser. And when the data of that component is fetched and prepared, it is also get streamed on browser and replaces the fallback.

In this way, The **First problem  can be fixed**.

**NOW for the second problem**, Code-splitting can be used.
If a javascript code for any component is taking too much time to be loaded. Then it can be splitted with help of **React.lazy**, form the main bundle and let the the main bundle reach at browser. Later on when the JS for that component is ready it can be sent on browser in an additional bundle.

In this way we do not need to fully load all the JS of page. It can be loaded in multiple chunks.
### Selective hydration on the client.
With help of code splitting, JS buundle can be splitted to multiple chunks and send on browser one after another. By doing this the hydrartion of each chunk is also done one after another. Hence, instead of doing all the hydration at once, page sections are hydrated one by one and become responsive one by one, resulting in better user experience.

With help of this **Third problem is also fixed**.

> Note if one component is hydrating and user tries to interact with another component which is not hydrated yet. React automatically starts the hydration of interacted component and leter on hydrates the previous component.

Despite of above three problems, There is still two problems remaining which may lead to slow loading of pages and a laggy user experience.

 1. **Unnecessary hydration delaying interactivity** : In an application there is a large part of UI which do not require any user interactivity. But in above SSR method, all the UI irrespective of weather it will take part on user-interactivity or not undergoes hydration. Which is clearly useless. 
 2. **Extensive client side processing that could result in poor performance**: There are some helper functions which are delivered on browser to help achieving some functionality. These helper functions might require high processing speed based on the usecase. This can make the browser slow.

So, if there is any way by which we skip hydration of those part of UI and keep the helpers on server itself and call then when required, it will be a great optimisation.

Hence, to solve this problem React introduced **React Server Component**  and **Server actions** in **Version 19**

## React Server Components (RSC Architecture)
RSC represents a new architecture designed by react team. It introduces a dual-component model.

 1. Client component
 2. Server component
### Client components
They are typically rendered on client side **(CSR)**  but, they can also be rendered to HTML on the server **(SSR)**. Allowing user to immediatly see the page's HTML content rather then a blank screen.

Client components have access to the client environment such as browser apis, states, effects, event listners etc.
### Server Component
The code of server component is not sent on the browser, only the HTML generated from server component is sent on the browser.
These components do not undergo hydration process. 
It has direct access to server side resources such as file system, database etc. 
Apart of these Server Components also do caching of generated HTML. Which make UI loading faster in subsequest requests

## Rendering in Next.JS
The app router in Next.JS 14 is build on **RSC Architecture**.