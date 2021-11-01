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
      },{
        "title": "Chapter2 application layer",
        "excerpt":"Server Client Architecture 서버 always-on host IP 주소 고정 데이터 센터 존재 클라이언트 필요시에만 연결 동적 IP 주소 가질 수 있음 클라이언트끼리 통신하지 않음 Client-Server Computing의 장점 데이터를 서버에서만 제공하기 때문에 서버만 유저의 authorization과 데이터 protection을 관리하면 된다 기능의 분리(서버는 데이터를 주기만 하고 클라이언트는 데이터를 받기만 한다)로 모든 노드가 독립적이고...","categories": ["컴퓨터 네트워크"],
        "tags": ["복습"],
        "url": "/%EC%BB%B4%ED%93%A8%ED%84%B0%20%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/%EC%BB%B4%EB%84%A4_chapter2/",
        "teaser": null
      },{
        "title": "Chapter3 Transport Layer",
        "excerpt":"Transport vs. network layer Network layer : 호스트끼리 통신 Transport layer : 호스트의 프로세스끼리 통신 Multiplexing, Demultiplexing Multiplexings Multiplexing : 여러신호를 변환하여 하나의 매체에 담아 보냄 데이터 송신 시 ‘여러’ 소켓의 데이터가 header를 달고 ‘하나의’ transport layer로 보내짐 Demultiplexing Demultiplexing : 매체에 담긴 신호를 원래의 신호로 복원 데이터 수신 시...","categories": ["컴퓨터 네트워크"],
        "tags": ["복습"],
        "url": "/%EC%BB%B4%ED%93%A8%ED%84%B0%20%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/%EC%BB%B4%EB%84%A4_chapter3/",
        "teaser": null
      }]
