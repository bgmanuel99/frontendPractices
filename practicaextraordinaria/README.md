Este proyecto no contiene una url, habra que insertar una propia, para ver el estilo de la url mirar el .env.sample

- La pagina web la he probado para que funcione en Google chrome, firefox e internet explorer.
- Esta pagina web no es responsiva, se ha programado en una pantalla de 27 pulgadas. Si no funciona el css o aparecen elementos descolocados es por abrirla en una pantalla mas pequeña o mas grande.
- Ademas se tendran que añadir las keys propias de cada api para poder realizar las peticiones. No las he añadido en un .env ya que no ejecuta el codigo por problemas que desconozco. Los puntos en los que habra que insertarlas son en:

    - App.tsx -> uri: "https://api.everbase.co/graphql?apikey={insert_api_key}"
    - Country.tsx -> "http://api.openweathermap.org/data/2.5/weather?q=" + data.countries[i].capital.name + "&appid={insert_api_key}"
    - City.tsx -> "http://api.openweathermap.org/data/2.5/weather?q=" + data.cities[i].name + "&appid={insert_api_key}"