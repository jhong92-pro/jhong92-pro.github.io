var store = [{
        "title": "MVC의 한계와 스프링 기본 구조",
        "excerpt":"스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술 기존 서블릿+JSP 의 한계 @Override public void process(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException{ String username = request.getParameter(\"username\"); int age = Integer.parseInt(request.getParameter(\"age\")); // logic String viewPath = \"/WEB-INF/shopping/product.jsp\"; RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath); dispatcher.forward(request, response); } 중복 소스 HttpServletRequest request, HttpServletResponse response CharacterEncoding...","categories": ["Spring"],
        "tags": ["복습"],
        "url": "/spring/MVC%EC%9D%98-%ED%95%9C%EA%B3%84%EC%99%80-%EC%8A%A4%ED%94%84%EB%A7%81-%EA%B8%B0%EB%B3%B8-%EA%B5%AC%EC%A1%B0/",
        "teaser": null
      },{
        "title": "스프링 기본 기능",
        "excerpt":"스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술 Welcome Page welcome page 경로 : src/main/resource/static/index.html URL 매핑 @Controller public class UrlMappingController { @RequestMapping(\"/basic\") public String basic() { return \"/view/basic\"; } @Controller : Controller의 역할을 수행하는 Bean으로 등록 @RequestMapping : 요청 URL을 어떤 메소드가 처리할 지 결정 해당 코드에서는 /basic...","categories": ["Spring"],
        "tags": ["복습"],
        "url": "/spring/%EC%8A%A4%ED%94%84%EB%A7%81-%EA%B8%B0%EB%B3%B8-%EA%B8%B0%EB%8A%A5/",
        "teaser": null
      }]
