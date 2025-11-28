package back.api.component;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessoes = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession sessao) {
        sessoes.add(sessao);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession sessao, CloseStatus status) {
        sessoes.remove(sessao);
    }

    @Override
    public void handleTextMessage(WebSocketSession sessao, TextMessage mensagem) throws IOException {
        for (WebSocketSession webSocketSession : sessoes) {
            if (!sessao.equals(webSocketSession)) {
                webSocketSession.sendMessage(mensagem);
            }
        }
    }
}