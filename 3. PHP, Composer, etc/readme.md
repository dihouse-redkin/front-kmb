В это сложно поверить, но мы всё еще не GeekBrains. 

А потому мы до сих пор пропагандируем принципы самообразования, любим маму, папу и хардкор. 

На третий день с неба спустился пророк и сказал: "Используй Композер, не будь лохом!"

А кто мы такие, чтобы спорить с пророком?

Короче, задача.

Написать систему классов (компонент) TestLoadExchange, которая будет тестировать нагрузку на наши апихи. 

Что нужно:

1) Скачать и встроить в систему классов компонент Faker https://fakerphp.github.io/** , который нужно будет установить через Composer
2) С помощью Faker'a сделать класс, который будет возвращать такой JSON пакет, но набитый абсолютно рандомными тестовыми данными 

Например, был такой запрос

```javascript
{
    "collection": "products",
    "method": "create",
    "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "shopId": "adoebike",
    "version": "1",
    "requestId": "7d01a6b2-8516-49fa-86ef-0f496f709d51",    
    "info": {
        "products": [
            {
                "name": "Электровелик ADO B26 (Новинка)",
                "guid": "4b142e1f-8651-41ab-b30e-de7e30fcad55",
                "vendor": "01173029-3c1f-4fac-b5a4-196deeb78ed5",
                "sku": "ADO_B26",
                "description": "ADO A26 – стильный и прочный байк, созданный для тех, кто ценит скорость и безопасность даже в самых экстремальных условиях. Электродвигатель помогает преодолеть  длинные дистанции и справиться со сложными дорожными условиями.",
                "content": "CLOTE: ADO A26 – стильный и прочный байк, созданный для тех, кто ценит скорость и безопасность даже в самых экстремальных условиях. Электродвигатель помогает преодолеть  длинные дистанции и справиться со сложными дорожными условиями.",
                "prices": {
                    "96ebef54-82d9-4c2f-afab-e0bcdc14ef18":"72850.0",
                    "06efef54-82d9-4c2f-afab-e0bcdc14ef19":"72200.0"
                }
            },
            {
                "name": "Электровелик ADO BC16 (Новиночка)",
                "guid": "b1d794a1-5735-41b7-ba8f-f965613afbfe",
                "vendor": "01173029-3c1f-4fac-b5a4-196deeb78ed5",
                "sku": "ADO_BC26",
                "description": "ADO A26 – стильный и прочный байк, созданный для тех, кто ценит скорость и безопасность даже в самых экстремальных условиях. Электродвигатель помогает преодолеть  длинные дистанции и справиться со сложными дорожными условиями.",
                "properties": {
                    "model_name": "BC16",
                    "short_description": "стильный, модный, молодёжный"
                }
            }
        ]
    }
}
```

Необходимо, чтобы мы могли на основе такого запроса получить бесконечное множество различных данных, чтобы товаров было не 2, а 202, 20002, 200000002, 20000000002 и так далее. И все данные были уникальны, но соблюдалась структура пакета и формат данных каждого поля.  

3) Создать еще один класс (или несколько классов), которые бы могли отправлять сформированные данные на какой-то сервер с помощью Guzzle (скачать и установить с помощью Composer)
4) Период отправки и количество пакетов должно настраиваться где-то, например, в конфиг-файле. 
   1) Количество данных для генерации (например, 200)
   2) Количество пакетов для отправки (например, 10). 
   3) Возможность отсылать 200 * 10 в заданный промежуток времени n
   
5) Результат выложить на Gitlab.