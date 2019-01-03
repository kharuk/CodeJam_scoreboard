# kharuk-2018Q3
https://kharuk.github.io/CodeJam_scoreboard/

    Ограничение:
        Должно работать в Chrome
        
    Что сдавать / критерии оценки:
        +5 баллов
            Создать пустую html страницу (Например, index.html).
            Добавить в index.html radio button для возможности переключения сессии, которую необходимо визуализировать.
        +55 баллов
            "Подготовить" любым способом дампы к визуализации (так как их нельзя просто так подключить к index.html).
            Построить таблицу, в которой первая колонка - GitHub Участника, а далее идут колонки с названием пазла и временем, затраченным участником для его решения. По ховеру на ячейку, показывающей время, должен появляться tooltip, показывающий селектор, который был введен участником при решении пазла. Названия пазлов в таблицы не должны быть захардкоданы, а получены из массива puzzles. Пример таблицы смотрите ниже.
        +5 баллов
            По переключению radio button - отображать соответсвующие сессии (rsschool или rsschool-demo).
        +35 баллов
            В таблицу добавить колонку "Comparison", которая будет содержать чекбоксы. "Чекнутые" строки будут отображаться в виде Line Chart (например, http://www.chartjs.org/samples/latest/charts/line/basic.html). Одновременно может быть выбрано до 10 строк. Line Chart по оси Х отображает название пазла, по Y - время решения, в легенде чарта - гитхаб игрока. Можно использовать готовый компонент Line Chart.
        -50 баллов за нарушение https://github.com/rolling-scopes-school/docs/blob/master/stage2-tasks-requirements.md
        +30 баллов Добавить возможность простмотреть участников, которые учились в прошлом наборе RSSchool (2018Q1), проходили CSS Quick Draw 2018Q1 и продолжают учиться сейчас. Построить любую сравнительную аналитику достигнутых ими результатов по сравнению с прошлым набором. Данные прошлого набора можно найти тут - https://github.com/rolling-scopes-school/tasks/blob/2018-Q1/tasks/codejam-scoreboard.md.

Дампы предыдущего CodeJam "CSS Quick Draw" лежат в папке: https://drive.google.com/drive/folders/10XH1dNj4c7yOptjFblhc1Y74FmMJNUwQ

В файле sessions.json нужная сессия находится на строчке 34.

Данные по каждому пазлу можно найти в поле rounds. Внутри каждого round’a есть хэшмэп solutions, где ключ — это id игрока из users.json (uid).

Solution каждого игрока — это последний полученный от игрока ввод. Поэтому для каждого игрока из users в каждом раунде солюшен может быть Correct, Incorrect или его может не быть вообще (если игрок не играл). В этом случае мы просто начисляем полное время пазла (для всех пазлов это 150 секунд).
