import { UsersController } from "./UsersController.js";
import { LessonsController } from "./LessonsController.js";
import { ExercisesController } from "./ExercisesController.js";
import { StudentProgressController } from "./StudentProgressController.js";
import { SubmissionsController } from "./SubmissionsController.js";

const usersController = new UsersController();
const lessonsController = new LessonsController();
const exercisesController = new ExercisesController();
const studentProgressController = new StudentProgressController();
const submissionsController = new SubmissionsController();

// Tworzenie domyślnego administratora
const adminDb = await usersController.createUser({
    name: "Admin",
    surname: "Admin",
    password: "test",
    email: "admin@example.com",
    role: "admin"
});

// Tworzenie przykładowego nauczyciela
const teacherDb = await usersController.createUser({
    name: "John",
    surname: "Doe",
    email: "teacher@example.com",
    password: "test",
    role: "teacher"
});

// Tworzenie przykładowego ucznia
const studentDb = await usersController.createUser({
    name: "Jane",
    surname: "Doe",
    email: "student@example.com",
    password: "test",
    role: "student"
});

// Tworzenie przykładowej lekcji
// Tworzenie kategorii "Python Tutorial" i pierwszej lekcji "Wprowadzenie do Pythona"
const pythonTutorialLesson1 = await lessonsController.createLesson({
    title: "Wprowadzenie do Pythona",
    description: "Poznaj podstawy języka Python, jego historię i zastosowania.",
    content: `
        <h2>Wprowadzenie do Pythona</h2>
        <p>Python to jeden z najpopularniejszych języków programowania na świecie. Jest prosty do nauki i 
        wszechstronny, dzięki czemu znajduje zastosowanie w wielu dziedzinach, takich jak analiza danych, 
        sztuczna inteligencja, tworzenie stron internetowych, automatyzacja zadań i wiele innych.</p>
        
        <h3>Dlaczego warto uczyć się Pythona?</h3>
        <ul>
            <li>Prosta i czytelna składnia</li>
            <li>Obszerna społeczność i wsparcie</li>
            <li>Wszechstronność (AI, Big Data, Web Development)</li>
            <li>Popularność wśród początkujących i zaawansowanych programistów</li>
        </ul>

        <h3>Twój pierwszy program w Pythonie</h3>
        <p>Aby rozpocząć pracę z Pythonem, wystarczy napisać proste polecenie:</p>

        <pre>
        <code>
        print("Witaj, świecie!")
        </code>
        </pre>

        <p>Powyższy kod wypisze na ekranie komunikat: <b>Witaj, świecie!</b></p>

        <h3>Instalacja Pythona</h3>
        <p>Aby zainstalować Pythona, odwiedź <a href="https://www.python.org/downloads/">oficjalną stronę Python</a> i pobierz odpowiednią wersję dla swojego systemu operacyjnego.</p>
    `,
    difficulty: "Początkujący",
    category: "Python Tutorial"

}, teacherDb.id);


// Tworzenie **nowego zadania quizowego** (wielokrotny wybór)
const quizPythonIntro = await exercisesController.createExercise({
    lesson_id: pythonTutorialLesson1.id,
    question: "Które z poniższych stwierdzeń o Pythonie jest poprawne?",
    answer_type: "Wielokrotny wybór",
    options: [
        "Python jest językiem kompilowanym.",
        "Python wymaga średników na końcu każdej linii.",
        "Python jest językiem dynamicznie typowanym.",
        "Python nie obsługuje programowania obiektowego."
    ],
    correct_answer: "Python jest językiem dynamicznie typowanym."
}, teacherDb.id);


// Tworzenie przykładowego ćwiczenia do lekcji
const exercisePythonIntro = await exercisesController.createExercise({
    lesson_id: pythonTutorialLesson1.id,
    question: "Co wypisze poniższy kod?",
    code_example: `print("Hello, Python!")`,
    answer_type: "Pole tekstowe",
    correct_answer: "Hello, Python!"
}, teacherDb.id);



// Tworzenie lekcji "Python Zmienne"
const pythonTutorialLesson2 = await lessonsController.createLesson({
    title: "Python Zmienne",
    description: "Dowiedz się, czym są zmienne w Pythonie i jak je deklarować.",
    content: `
        <h2>Python Zmienne</h2>
        <p>Zmienne w Pythonie służą do przechowywania danych. Można je traktować jako kontenery na informacje.</p>

        <h3>Tworzenie zmiennych</h3>
        <p>W Pythonie zmienną można utworzyć, przypisując jej wartość bez konieczności określania jej typu:</p>

        <pre>
        <code>
        x = 5
        y = "Witaj, świecie!"
        print(x)
        print(y)
        </code>
        </pre>

        <p>Powyższy kod wypisze:</p>

        <pre>
        <code>
        5
        Witaj, świecie!
        </code>
        </pre>

        <h3>Zasady nazewnictwa zmiennych</h3>
        <ul>
            <li>Nazwa zmiennej musi zaczynać się literą lub znakiem podkreślenia (_).</li>
            <li>Nie może zaczynać się od cyfry.</li>
            <li>Może zawierać tylko litery, cyfry i podkreślenia (_).</li>
            <li>Python rozróżnia wielkie i małe litery (np. <code>miasto</code> i <code>Miasto</code> to różne zmienne).</li>
        </ul>

        <h3>Przypisanie wielu wartości</h3>
        <p>W Pythonie można przypisać wartości wielu zmiennym jednocześnie:</p>

        <pre>
        <code>
        a, b, c = "Jabłko", "Banan", "Wiśnia"
        print(a)
        print(b)
        print(c)
        </code>
        </pre>

        <h3>Zmienne globalne i lokalne</h3>
        <p>Zmienne utworzone wewnątrz funkcji są lokalne i dostępne tylko wewnątrz tej funkcji:</p>

        <pre>
        <code>
        def myFunction():
            lokalna = "Jestem lokalna"
            print(lokalna)

        myFunction()
        print(lokalna)  # Spowoduje błąd, ponieważ 'lokalna' nie jest dostępna poza funkcją
        </code>
        </pre>

        <p>Aby stworzyć zmienną globalną wewnątrz funkcji, użyj słowa kluczowego <code>global</code>:</p>

        <pre>
        <code>
        def myFunction():
            global zmienna
            zmienna = "Jestem globalna"

        myFunction()
        print(zmienna)  # Działa, ponieważ zmienna jest teraz globalna
        </code>
        </pre>
    `,
    difficulty: "Początkujący",
    category: "Python Tutorial"
}, teacherDb.id);

// Tworzenie przykładowego ćwiczenia do lekcji "Python Zmienne"
const exercisePythonVariables = await exercisesController.createExercise({
    lesson_id: pythonTutorialLesson2.id,
    question: "Jaki będzie wynik poniższego kodu?",
    code_example: `
        x = "Python"
        y = " jest super!"
        print(x + y)
    `,
    answer_type: "Pole tekstowe",
    correct_answer: "Python jest super!"
}, teacherDb.id);


const pythonDataTypesLesson = await lessonsController.createLesson({
    title: "Python Typy Danych",
    description: "Poznaj różne typy danych w Pythonie i ich zastosowanie.",
    content: `
        <section class="lesson-section">
            <h2 class="lesson-title">Python - Typy Danych</h2>
            <p class="lesson-text">
                W Pythonie każda zmienna ma określony typ danych, który definiuje, jakie operacje można na niej wykonać.  
                Python automatycznie określa typ danych podczas przypisania wartości do zmiennej.
            </p>
        </section>

        <section class="lesson-section">
            <h3 class="lesson-subtitle">Podstawowe typy danych w Pythonie</h3>
            <ul class="lesson-list">
                <li><b>Liczby całkowite (<code>int</code>)</b>: np. <code>10, -5, 1000</code></li>
                <li><b>Liczby zmiennoprzecinkowe (<code>float</code>)</b>: np. <code>3.14, -0.5, 2.7</code></li>
                <li><b>Łańcuchy znaków (<code>str</code>)</b>: np. <code>"Python", 'Hello'</code></li>
                <li><b>Wartości logiczne (<code>bool</code>)</b>: <code>True, False</code></li>
                <li><b>Listy (<code>list</code>)</b>: np. <code>[1, 2, 3, "Python"]</code></li>
                <li><b>Krotki (<code>tuple</code>)</b>: np. <code>(10, 20, "Hello")</code></li>
                <li><b>Słowniki (<code>dict</code>)</b>: np. <code>{"nazwa": "Python", "wersja": 3.10}</code></li>
                <li><b>Zbiory (<code>set</code>)</b>: np. <code>{1, 2, 3, 4}</code></li>
            </ul>
        </section>

        <section class="lesson-section">
            <h3 class="lesson-subtitle">Sprawdzenie typu danych</h3>
            <p class="lesson-text">
                Możemy sprawdzić typ danej zmiennej za pomocą funkcji <code>type()</code>:
            </p>
            <pre class="lesson-code">
                <code>
x = 10
y = 3.14
z = "Python"

print(type(x))  # Wynik: &lt;class 'int'&gt;
print(type(y))  # Wynik: &lt;class 'float'&gt;
print(type(z))  # Wynik: &lt;class 'str'&gt;
                </code>
            </pre>
        </section>

        <section class="lesson-section">
            <h3 class="lesson-subtitle">Konwersja typów danych</h3>
            <p class="lesson-text">
                W Pythonie możemy zmieniać typy danych przy użyciu funkcji wbudowanych:
            </p>
            <pre class="lesson-code">
                <code>
a = 10  # int
b = str(a)  # Konwersja na string
c = float(a)  # Konwersja na float

print(type(b))  # Wynik: &lt;class 'str'&gt;
print(type(c))  # Wynik: &lt;class 'float'&gt;
                </code>
            </pre>
        </section>
        
        <section class="lesson-section">
            <h3 class="lesson-subtitle">Dlaczego warto znać typy danych?</h3>
            <p class="lesson-text">
                Znajomość typów danych pozwala na efektywne programowanie i unikanie błędów w kodzie.
                Przykładowo, próba dodania liczby do łańcucha znaków spowoduje błąd:
            </p>
            <pre class="lesson-code">
                <code>
x = 5
y = "Python"
print(x + y)  # TypeError: unsupported operand type(s) for +: 'int' and 'str'
                </code>
            </pre>
            <p class="lesson-text">
                Aby poprawnie wykonać tę operację, musimy przekonwertować liczbę na string:
            </p>
            <pre class="lesson-code">
                <code>
print(str(x) + y)  # Wynik: "5Python"
                </code>
            </pre>
        </section>
    `,
    difficulty: "Początkujący",
    category: "Python Tutorial"
}, teacherDb.id);

const pythonDataTypesExercise = await exercisesController.createExercise({
    lesson_id: pythonDataTypesLesson.id,
    question: "Jaki będzie wynik poniższego kodu w Pythonie?",
    code_example: `
x = "5"
y = 2
print(x * y)
    `,
    answer_type: "Pole tekstowe",
    correct_answer: "55",
    explanation: "Operator '*' dla stringa i liczby powoduje powtórzenie stringa określoną liczbę razy.",
}, teacherDb.id);

const cat1Lesson3 = await lessonsController.createLesson({
    title: "Instrukcje warunkowe w Pythonie",
    description: "Poznaj instrukcje warunkowe `if`, `elif` i `else` w Pythonie.",
    content: `
        <div class="container mt-4">
            <h2 class="text-primary">Instrukcje warunkowe w Pythonie</h2>
            <p class="lead">Instrukcje warunkowe pozwalają na sterowanie przepływem programu w zależności od spełnienia określonych warunków.</p>

            <div class="card my-4">
                <div class="card-body">
                    <h3 class="card-title text-success">Instrukcja <code>if</code></h3>
                    <p class="card-text">Instrukcja <code>if</code> pozwala na wykonanie kodu tylko wtedy, gdy warunek jest spełniony.</p>
                    <pre class="bg-light p-3 border rounded"><code>if warunek:
    # kod do wykonania, jeśli warunek jest spełniony</code></pre>
                </div>
            </div>

            <div class="card my-4">
                <div class="card-body">
                    <h3 class="card-title text-warning">Instrukcja <code>if-else</code></h3>
                    <p class="card-text">Dodanie bloku <code>else</code> pozwala na wykonanie kodu, gdy warunek <code>if</code> nie jest spełniony.</p>
                    <pre class="bg-light p-3 border rounded"><code>if warunek:
    # kod jeśli warunek jest prawdziwy
else:
    # kod jeśli warunek jest fałszywy</code></pre>
                </div>
            </div>

            <div class="card my-4">
                <div class="card-body">
                    <h3 class="card-title text-danger">Instrukcja <code>if-elif-else</code></h3>
                    <p class="card-text">Gdy chcemy sprawdzić więcej niż dwa warunki, możemy użyć <code>elif</code> (else if).</p>
                    <pre class="bg-light p-3 border rounded"><code>if warunek1:
    # kod jeśli warunek1 jest prawdziwy
elif warunek2:
    # kod jeśli warunek2 jest prawdziwy
else:
    # kod jeśli żaden warunek nie jest prawdziwy</code></pre>
                </div>
            </div>

            <h3 class="mt-5">Przykład użycia instrukcji warunkowych:</h3>
            <div class="bg-light p-3 border rounded">
                <pre><code>x = 10

if x > 0:
    print("Liczba jest dodatnia")
elif x < 0:
    print("Liczba jest ujemna")
else:
    print("Liczba to zero")</code></pre>
            </div>

            <p class="mt-3"><strong>Wynik:</strong></p>
            <div class="alert alert-info">Liczba jest dodatnia</div>

            <h3 class="mt-5 text-info">Wskazówka</h3>
            <p>Pamiętaj, że w Pythonie <strong>wcięcia</strong> są kluczowe! Musisz prawidłowo wciąć kod w instrukcjach warunkowych.</p>
        </div>
    `,
    difficulty: "Początkujący",
    category: "Python Tutorial"
}, teacherDb.id);

// Tworzenie zadania do tej lekcji
const exerciseConditionals = await exercisesController.createExercise({
    lesson_id: cat1Lesson3.id,
    question: "Napisz program, który sprawdza, czy liczba jest parzysta czy nieparzysta.",
    code_example: `
# Pobierz liczbę od użytkownika
x = int(input("Podaj liczbę: "))

# Sprawdź, czy liczba jest parzysta
if ...:
    print("Liczba jest parzysta")
else:
    print("Liczba jest nieparzysta")
    `,
    answer_type: "Pole tekstowe",
    correct_answer: "Parzysta lub Nieparzysta",
}, teacherDb.id);

const cat1Lesson5 = await lessonsController.createLesson({
    title: "Funkcje w Pythonie",
    description: "Poznaj sposób definiowania i wywoływania funkcji w Pythonie.",
    content: `
        <div class="container mt-4">
            <h2 class="text-primary">Funkcje w Pythonie</h2>
            <p class="lead">Funkcje pozwalają na wielokrotne wykorzystanie kodu i poprawiają jego czytelność oraz organizację.</p>

            <div class="card my-4">
                <div class="card-body">
                    <h3 class="card-title text-success">Definiowanie funkcji</h3>
                    <p class="card-text">W Pythonie funkcję definiujemy za pomocą słowa kluczowego <code>def</code>, a jej kod umieszczamy w bloku wciętym.</p>
                    <pre class="bg-light p-3 border rounded"><code>def nazwa_funkcji():
    print("Witaj w funkcji!")</code></pre>
                </div>
            </div>

            <h4>Wywoływanie funkcji:</h4>
            <div class="bg-light p-3 border rounded">
                <pre><code>def przywitaj():
    print("Cześć! Jak się masz?")

przywitaj()</code></pre>
            </div>
            <p class="mt-3"><strong>Wynik:</strong></p>
            <div class="alert alert-info">
                Cześć! Jak się masz?
            </div>

            <div class="card my-4">
                <div class="card-body">
                    <h3 class="card-title text-warning">Argumenty funkcji</h3>
                    <p class="card-text">Funkcje mogą przyjmować argumenty, które pozwalają na przekazanie danych.</p>
                    <pre class="bg-light p-3 border rounded"><code>def przywitaj_uzytkownika(imie):
    print(f"Cześć, {imie}!")

przywitaj_uzytkownika("Anna")</code></pre>
                </div>
            </div>

            <p class="mt-3"><strong>Wynik:</strong></p>
            <div class="alert alert-info">
                Cześć, Anna!
            </div>

            <div class="card my-4">
                <div class="card-body">
                    <h3 class="card-title text-danger">Zwracanie wartości</h3>
                    <p class="card-text">Funkcja może zwracać wartość za pomocą <code>return</code>.</p>
                    <pre class="bg-light p-3 border rounded"><code>def dodaj(a, b):
    return a + b

wynik = dodaj(5, 3)
print("Wynik dodawania:", wynik)</code></pre>
                </div>
            </div>

            <p class="mt-3"><strong>Wynik:</strong></p>
            <div class="alert alert-info">
                Wynik dodawania: 8
            </div>

            <h3 class="mt-5 text-info">Podsumowanie</h3>
            <ul>
                <li>Funkcje definiujemy za pomocą <code>def</code>.</li>
                <li>Funkcję wywołujemy przez wpisanie jej nazwy i nawiasów <code>()</code>.</li>
                <li>Można przekazywać argumenty do funkcji.</li>
                <li>Funkcje mogą zwracać wartości za pomocą <code>return</code>.</li>
            </ul>
        </div>
    `,
    difficulty: "Początkujący",
    category: "Python Tutorial"
}, teacherDb.id);

// Tworzenie zadania do tej lekcji
const exerciseFunctions = await exercisesController.createExercise({
    lesson_id: cat1Lesson5.id,
    question: "Napisz funkcję 'powitaj', która przyjmuje imię jako argument i wypisuje powitanie.",
    code_example: `
# Zaimplementuj funkcję 'powitaj', która wypisuje powitanie dla użytkownika

def powitaj(imie):
    print("Cześć, " + imie + "!")

powitaj("Krzysztof")  # Przykładowe wywołanie`,
    answer_type: "Pole tekstowe",
    correct_answer: "Cześć, Krzysztof!",
}, teacherDb.id);

const pythonArraysLesson = await lessonsController.createLesson({
    title: "Tablice w Pythonie",
    description: "Dowiedz się, jak tworzyć i używać tablic w Pythonie.",
    content: `
        <div class="container">
            <h2 class="text-primary">Tablice w Pythonie</h2>
            <p class="lead">
                W Pythonie tablice są używane do przechowywania wielu wartości w jednej zmiennej.
                W przeciwieństwie do wielu innych języków, Python nie posiada dedykowanego typu danych „array”,
                ale można użyć list do przechowywania zbiorów wartości.
            </p>

            <h3 class="mt-4">Tworzenie tablicy</h3>
            <p>W Pythonie tablicę można utworzyć za pomocą listy:</p>
            <pre class="bg-light p-3"><code>owoce = ["jabłko", "banan", "wiśnia"]</code></pre>

            <h3 class="mt-4">Dostęp do elementów tablicy</h3>
            <p>Do elementów tablicy można uzyskać dostęp za pomocą indeksu:</p>
            <pre class="bg-light p-3"><code>print(owoce[0])  # Wypisze: jabłko</code></pre>

            <h3 class="mt-4">Zmiana wartości elementu</h3>
            <p>Element tablicy można zmienić, odwołując się do niego przez indeks:</p>
            <pre class="bg-light p-3"><code>owoce[1] = "gruszka"
print(owoce)  # ["jabłko", "gruszka", "wiśnia"]</code></pre>

            <h3 class="mt-4">Iterowanie przez tablicę</h3>
            <p>Możemy przejść przez wszystkie elementy tablicy używając pętli <code>for</code>:</p>
            <pre class="bg-light p-3"><code>for owoc in owoce:
    print(owoc)</code></pre>

            <h3 class="mt-4">Sprawdzanie długości tablicy</h3>
            <p>Funkcja <code>len()</code> zwraca liczbę elementów w tablicy:</p>
            <pre class="bg-light p-3"><code>print(len(owoce))  # Wypisze: 3</code></pre>

            <h3 class="mt-4">Dodawanie elementu do tablicy</h3>
            <p>Użyj metody <code>append()</code>, aby dodać nowy element na końcu tablicy:</p>
            <pre class="bg-light p-3"><code>owoce.append("pomarańcza")
print(owoce)  # ["jabłko", "gruszka", "wiśnia", "pomarańcza"]</code></pre>

            <h3 class="mt-4">Usuwanie elementu z tablicy</h3>
            <p>Metoda <code>remove()</code> usuwa określony element tablicy:</p>
            <pre class="bg-light p-3"><code>owoce.remove("jabłko")
print(owoce)  # ["gruszka", "wiśnia", "pomarańcza"]</code></pre>

            <h3 class="mt-4">Usuwanie elementu według indeksu</h3>
            <p>Możemy również usunąć element, używając metody <code>pop()</code> lub słowa kluczowego <code>del</code>:</p>
            <pre class="bg-light p-3"><code>owoce.pop(1)  # Usuwa element na indeksie 1
print(owoce)  # ["gruszka", "pomarańcza"]</code></pre>

            <h3 class="mt-4">Sortowanie tablicy</h3>
            <p>Metoda <code>sort()</code> sortuje tablicę alfabetycznie lub numerycznie:</p>
            <pre class="bg-light p-3"><code>owoce.sort()
print(owoce)  # ["gruszka", "pomarańcza"]</code></pre>

            <h3 class="mt-4">Odwrotne sortowanie</h3>
            <p>Metoda <code>sort(reverse=True)</code> sortuje elementy w kolejności malejącej:</p>
            <pre class="bg-light p-3"><code>owoce.sort(reverse=True)
print(owoce)  # ["pomarańcza", "gruszka"]</code></pre>

            <h3 class="mt-4">Podsumowanie</h3>
            <ul>
                <li>Tablice w Pythonie są reprezentowane przez listy.</li>
                <li>Elementy można dodawać, usuwać i modyfikować.</li>
                <li>Do przechodzenia przez elementy można używać pętli.</li>
                <li>Metoda <code>sort()</code> pozwala na sortowanie listy.</li>
            </ul>
        </div>
    `,
    difficulty: "Początkujący",
    category: "Python Tutorial"
}, teacherDb.id);


const exercisePythonArrays = await exercisesController.createExercise({
    lesson_id: pythonArraysLesson.id,
    question: "Jaki będzie wynik poniższego kodu w Pythonie?",
    code_example: `
owoce = ["jabłko", "banan", "wiśnia"]
owoce.append("gruszka")
owoce.sort()
print(owoce[0])
    `,
    answer_type: "Pole tekstowe",
    correct_answer: "banan",
    explanation: "Po dodaniu 'gruszka' i posortowaniu listy alfabetycznie, pierwszym elementem będzie 'banan'."
}, teacherDb.id);


const pythonClassesLesson = await lessonsController.createLesson({
    title: "Klasy i Obiekty w Pythonie",
    description: "Poznaj programowanie obiektowe w Pythonie.",
    content: `
        <div class="container">
            <h2 class="text-primary">Klasy i Obiekty w Pythonie</h2>
            <p class="lead">
                Python obsługuje **programowanie obiektowe** (OOP), co oznacza, że można tworzyć własne klasy i obiekty.
                Obiekt to instancja klasy, która zawiera zarówno **dane (atrybuty)**, jak i **zachowania (metody)**.
            </p>

            <h3 class="mt-4">Tworzenie klasy</h3>
            <p>Aby utworzyć klasę w Pythonie, używamy słowa kluczowego <code>class</code>:</p>
            <pre class="bg-light p-3"><code>class Samochod:
    def __init__(self, marka, model, rok):
        self.marka = marka
        self.model = model
        self.rok = rok</code></pre>

            <h3 class="mt-4">Tworzenie obiektu</h3>
            <p>Po zdefiniowaniu klasy możemy utworzyć jej instancję:</p>
            <pre class="bg-light p-3"><code>moj_samochod = Samochod("Toyota", "Corolla", 2020)</code></pre>

            <h3 class="mt-4">Dostęp do atrybutów</h3>
            <p>Możemy uzyskać dostęp do właściwości obiektu, odwołując się do nich po nazwie:</p>
            <pre class="bg-light p-3"><code>print(moj_samochod.marka)  # Wypisze: Toyota</code></pre>

            <h3 class="mt-4">Dodawanie metod do klasy</h3>
            <p>Metody to funkcje zdefiniowane wewnątrz klasy:</p>
            <pre class="bg-light p-3"><code>class Samochod:
    def __init__(self, marka, model, rok):
        self.marka = marka
        self.model = model
        self.rok = rok

    def przedstaw_sie(self):
        return f"Jestem {self.marka} {self.model} z {self.rok} roku."

moj_samochod = Samochod("Ford", "Mustang", 1969)
print(moj_samochod.przedstaw_sie())</code></pre>

            <h3 class="mt-4">Modyfikowanie atrybutów</h3>
            <p>Wartości atrybutów można zmieniać dynamicznie:</p>
            <pre class="bg-light p-3"><code>moj_samochod.rok = 2022
print(moj_samochod.rok)  # Wypisze: 2022</code></pre>

            <h3 class="mt-4">Usuwanie obiektu</h3>
            <p>Obiekt można usunąć za pomocą słowa kluczowego <code>del</code>:</p>
            <pre class="bg-light p-3"><code>del moj_samochod</code></pre>

            <h3 class="mt-4">Dziedziczenie w klasach</h3>
            <p>Jedna klasa może dziedziczyć właściwości i metody innej klasy:</p>
            <pre class="bg-light p-3"><code>class ElektrycznySamochod(Samochod):
    def __init__(self, marka, model, rok, zasieg):
        super().__init__(marka, model, rok)
        self.zasieg = zasieg</code></pre>

            <h3 class="mt-4">Podsumowanie</h3>
            <ul>
                <li>**Klasy** to szablony do tworzenia obiektów.</li>
                <li>**Obiekty** mają atrybuty (dane) i metody (zachowania).</li>
                <li>Metoda <code>__init__</code> to konstruktor klasy.</li>
                <li>Klasy mogą dziedziczyć cechy innych klas.</li>
            </ul>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Python Tutorial"
}, teacherDb.id);

const exercisePythonClasses = await exercisesController.createExercise({
    lesson_id: pythonClassesLesson.id,
    question: "Uzupełnij kod, aby poprawnie utworzyć klasę `Pies`, która ma atrybut `imie` i metodę `szczekaj()` zwracającą 'Hau Hau!'.",
    code_example: `
class Pies:
    def __init__(self, imie):
        self.imie = imie

    def szczekaj(self):
        _____

mój_pies = Pies("Reksio")
print(mój_pies.szczekaj())  # Oczekiwany wynik: Hau Hau!
    `,
    answer_type: "Pole tekstowe",
    correct_answer: `"Hau Hau!"`,
    explanation: "Metoda `szczekaj()` powinna zwracać wartość 'Hau Hau!', aby poprawnie działała zgodnie z oczekiwaniami."
}, teacherDb.id);

const pythonInheritanceLesson = await lessonsController.createLesson({
    title: "Dziedziczenie w Pythonie",
    description: "Poznaj mechanizm dziedziczenia i rozszerzania funkcjonalności klas.",
    content: `
        <div class="container">
            <h2 class="text-primary">Dziedziczenie w Pythonie</h2>
            <p class="lead">
                Dziedziczenie to mechanizm pozwalający jednej klasie na przejęcie właściwości i metod innej klasy.
                Pozwala to na ponowne wykorzystanie kodu i organizację klas w hierarchię.
            </p>

            <h3 class="mt-4">Tworzenie klasy bazowej</h3>
            <p>Najpierw tworzymy klasę bazową (rodzica), która zawiera wspólne właściwości:</p>
            <pre class="bg-light p-3"><code>class Zwierze:
    def __init__(self, gatunek):
        self.gatunek = gatunek

    def przedstaw_sie(self):
        return f"Jestem {self.gatunek}."</code></pre>

            <h3 class="mt-4">Tworzenie klasy dziedziczącej</h3>
            <p>Nowa klasa może dziedziczyć po klasie bazowej:</p>
            <pre class="bg-light p-3"><code>class Pies(Zwierze):
    def __init__(self, imie):
        super().__init__("Pies")
        self.imie = imie

    def szczekaj(self):
        return "Hau hau!"</code></pre>

            <h3 class="mt-4">Użycie dziedziczenia</h3>
            <p>Tworzymy obiekt klasy Pies i używamy metod:</p>
            <pre class="bg-light p-3"><code>reksio = Pies("Reksio")
print(reksio.przedstaw_sie())  # Wypisze: Jestem Pies.
print(reksio.szczekaj())  # Wypisze: Hau hau!</code></pre>

            <h3 class="mt-4">Nadpisywanie metod</h3>
            <p>Klasa potomna może zmieniać działanie metod z klasy rodzica:</p>
            <pre class="bg-light p-3"><code>class Kot(Zwierze):
    def __init__(self, imie):
        super().__init__("Kot")
        self.imie = imie

    def przedstaw_sie(self):
        return f"Jestem kotem o imieniu {self.imie}."

    def mialcz(self):
        return "Miau!"</code></pre>

            <h3 class="mt-4">Korzystanie z nowej klasy</h3>
            <pre class="bg-light p-3"><code>mruczek = Kot("Mruczek")
print(mruczek.przedstaw_sie())  # Wypisze: Jestem kotem o imieniu Mruczek.
print(mruczek.mialcz())  # Wypisze: Miau!</code></pre>

            <h3 class="mt-4">Podsumowanie</h3>
            <ul>
                <li>**Dziedziczenie** pozwala klasie potomnej korzystać z właściwości i metod klasy bazowej.</li>
                <li>**super()** umożliwia wywołanie metod klasy bazowej w klasie dziedziczącej.</li>
                <li>Metody klasy bazowej można **nadpisywać**.</li>
                <li>Dziedziczenie ułatwia organizację kodu i jego ponowne wykorzystanie.</li>
            </ul>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Python Tutorial"
}, teacherDb.id);

const exercisePythonInheritance = await exercisesController.createExercise({
    lesson_id: pythonInheritanceLesson.id,
    question: "Uzupełnij kod, aby klasa `Kot` dziedziczyła po klasie `Zwierze` i miała dodatkową metodę `mialcz()` zwracającą 'Miau!'.",
    code_example: `
class Zwierze:
    def __init__(self, gatunek):
        self.gatunek = gatunek

    def przedstaw_sie(self):
        return f"Jestem {self.gatunek}."

class Kot(_____):
    def __init__(self, imie):
        super().__init__("Kot")
        self.imie = imie

    def mialcz(self):
        return _____

mruczek = Kot("Mruczek")
print(mruczek.przedstaw_sie())  # Oczekiwany wynik: Jestem Kot.
print(mruczek.mialcz())  # Oczekiwany wynik: Miau!
    `,
    answer_type: "Pole tekstowe",
    correct_answer: `"Miau!"`,
    explanation: "Klasa `Kot` powinna dziedziczyć po `Zwierze` i dodać metodę `mialcz()` zwracającą 'Miau!'."
}, teacherDb.id);

const pythonIteratorsLesson = await lessonsController.createLesson({
    title: "Iteratory w Pythonie",
    description: "Poznaj mechanizm iteratorów i jak ich używać w Pythonie.",
    content: `
        <div class="container">
            <h2 class="text-primary">Iteratory w Pythonie</h2>
            <p class="lead">
                Iteratory to obiekty, które można przeglądać (iterować) jeden element na raz.
                Przykładem iteratorów są listy, krotki, zbiory i słowniki.
            </p>

            <h3 class="mt-4">Iterowanie przez listę</h3>
            <p>W Pythonie można używać pętli <code>for</code> do przechodzenia przez kolekcje:</p>
            <pre class="bg-light p-3"><code>moje_lista = ["jabłko", "banan", "wiśnia"]
for owoc in moje_lista:
    print(owoc)</code></pre>

            <h3 class="mt-4">Czym jest iterator?</h3>
            <p>Obiekt jest iteratorem, jeśli posiada metody <code>__iter__()</code> i <code>__next__()</code>.</p>
            <pre class="bg-light p-3"><code>moje_iter = iter(moje_lista)

print(next(moje_iter))  # jabłko
print(next(moje_iter))  # banan
print(next(moje_iter))  # wiśnia</code></pre>

            <h3 class="mt-4">Tworzenie własnego iteratora</h3>
            <p>Możemy utworzyć własny iterator, definiując klasę z metodami <code>__iter__()</code> i <code>__next__()</code>:</p>
            <pre class="bg-light p-3"><code>class MojeLiczby:
    def __iter__(self):
        self.liczba = 1
        return self

    def __next__(self):
        x = self.liczba
        self.liczba += 1
        return x

moje_liczby = MojeLiczby()
moj_iter = iter(moje_liczby)

print(next(moj_iter))  # 1
print(next(moj_iter))  # 2
print(next(moj_iter))  # 3</code></pre>

            <h3 class="mt-4">Zatrzymywanie iteracji</h3>
            <p>Wewnątrz metody <code>__next__()</code> możemy podnieść wyjątek <code>StopIteration</code>, aby zakończyć iterację:</p>
            <pre class="bg-light p-3"><code>class MojeLiczby:
    def __iter__(self):
        self.liczba = 1
        return self

    def __next__(self):
        if self.liczba > 5:
            raise StopIteration
        x = self.liczba
        self.liczba += 1
        return x

moje_liczby = MojeLiczby()
moj_iter = iter(moje_liczby)

for liczba in moj_iter:
    print(liczba)</code></pre>

            <h3 class="mt-4">Podsumowanie</h3>
            <ul>
                <li>Iteratory posiadają metody <code>__iter__()</code> i <code>__next__()</code>.</li>
                <li>Można iterować po kolekcjach jak listy i krotki.</li>
                <li>Możemy tworzyć własne iteratory.</li>
                <li>Przerwanie iteracji odbywa się poprzez podniesienie wyjątku <code>StopIteration</code>.</li>
            </ul>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Python Tutorial"
}, teacherDb.id);

const exercisePythonIterators = await exercisesController.createExercise({
    lesson_id: pythonIteratorsLesson.id,
    question: "Uzupełnij kod, aby stworzyć iterator zwracający liczby od 1 do 3.",
    code_example: `
class Licznik:
    def __iter__(self):
        self.liczba = 1
        return self

    def __next__(self):
        if self.liczba > 3:
            raise _____
        x = self.liczba
        self.liczba += 1
        return x

moje_liczby = Licznik()
moj_iter = iter(moje_liczby)

print(next(moj_iter))  # Oczekiwany wynik: 1
print(next(moj_iter))  # Oczekiwany wynik: 2
print(next(moj_iter))  # Oczekiwany wynik: 3
print(next(moj_iter))  # Oczekiwany wynik: StopIteration
    `,
    answer_type: "Pole tekstowe",
    correct_answer: `"StopIteration"`,
    explanation: "Iterator powinien zatrzymać się po osiągnięciu liczby 3, podnosząc wyjątek StopIteration."
}, teacherDb.id);

const pythonPolymorphismLesson = await lessonsController.createLesson({
    title: "Polimorfizm w Pythonie",
    description: "Poznaj koncepcję polimorfizmu i jak go używać w Pythonie.",
    content: `
        <div class="container">
            <h2 class="text-primary">Polimorfizm w Pythonie</h2>
            <p class="lead">
                Polimorfizm oznacza możliwość użycia tej samej nazwy metody dla różnych typów obiektów.
                Dzięki temu kod staje się bardziej elastyczny i łatwiejszy do rozbudowy.
            </p>

            <h3 class="mt-4">Polimorfizm wbudowany</h3>
            <p>W Pythonie wiele wbudowanych funkcji działa z różnymi typami danych.</p>
            <pre class="bg-light p-3"><code>print(len("Python"))  # 6 (dla stringa)
print(len([1, 2, 3, 4]))  # 4 (dla listy)
print(len({"a": 1, "b": 2}))  # 2 (dla słownika)</code></pre>

            <h3 class="mt-4">Polimorfizm w klasach</h3>
            <p>Możemy zdefiniować metody o tej samej nazwie w różnych klasach.</p>
            <pre class="bg-light p-3"><code>class Kot:
    def dzwiek(self):
        return "Miau!"

class Pies:
    def dzwiek(self):
        return "Hau!"

zwierzeta = [Kot(), Pies()]

for zwierze in zwierzeta:
    print(zwierze.dzwiek())  # "Miau!" "Hau!"</code></pre>

            <h3 class="mt-4">Polimorfizm w dziedziczeniu</h3>
            <p>Podklasy mogą nadpisywać metody klas nadrzędnych, dostosowując ich działanie.</p>
            <pre class="bg-light p-3"><code>class Zwierze:
    def dzwiek(self):
        return "Dźwięk zwierzęcia"

class Kot(Zwierze):
    def dzwiek(self):
        return "Miau!"

class Pies(Zwierze):
    def dzwiek(self):
        return "Hau!"

zwierze1 = Kot()
zwierze2 = Pies()

print(zwierze1.dzwiek())  # "Miau!"
print(zwierze2.dzwiek())  # "Hau!"</code></pre>

            <h3 class="mt-4">Polimorfizm w praktyce</h3>
            <p>W praktyce polimorfizm pozwala na elastyczne podejście do kodu i łatwiejsze zarządzanie obiektami.</p>
            <pre class="bg-light p-3"><code>class Ksztalt:
    def pole(self):
        pass

class Kwadrat(Ksztalt):
    def __init__(self, bok):
        self.bok = bok

    def pole(self):
        return self.bok * self.bok

class Kolo(Ksztalt):
    def __init__(self, promien):
        self.promien = promien

    def pole(self):
        return 3.14 * self.promien * self.promien

ksztalty = [Kwadrat(4), Kolo(3)]

for ksztalt in ksztalty:
    print(ksztalt.pole())  # 16, 28.26</code></pre>

            <h3 class="mt-4">Podsumowanie</h3>
            <ul>
                <li>Polimorfizm pozwala używać tej samej metody w różnych klasach.</li>
                <li>Obiekty różnych klas mogą implementować tę samą metodę, ale z różnym działaniem.</li>
                <li>Polimorfizm zwiększa elastyczność kodu i ułatwia zarządzanie obiektami.</li>
            </ul>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Python Tutorial"
}, teacherDb.id);

const exercisePythonPolymorphism = await exercisesController.createExercise({
    lesson_id: pythonPolymorphismLesson.id,
    question: "Uzupełnij kod, aby użyć polimorfizmu w metodzie dzwiek().",
    code_example: `
class Zwierze:
    def dzwiek(self):
        return "Dźwięk zwierzęcia"

class Kot(Zwierze):
    def dzwiek(self):
        return "_____"

class Pies(Zwierze):
    def dzwiek(self):
        return "_____"

zwierze1 = Kot()
zwierze2 = Pies()

print(zwierze1.dzwiek())  # Oczekiwany wynik: Miau!
print(zwierze2.dzwiek())  # Oczekiwany wynik: Hau!
    `,
    answer_type: "Pole tekstowe",
    correct_answer: `"Miau!", "Hau!"`,
    explanation: "Podklasy powinny nadpisywać metodę dzwiek(), aby zwracać unikalne wartości dla każdego zwierzęcia."
}, teacherDb.id);


// Tworzenie nowej kategorii "File Handling" i pierwszej lekcji
const fileHandlingLesson1 = await lessonsController.createLesson({
    title: "Operacje na plikach w Pythonie",
    description: "Dowiedz się, jak otwierać, czytać, zapisywać i zamykać pliki w Pythonie.",
    content: `
        <div class="container">
            <h2 class="text-primary">Operacje na plikach w Pythonie</h2>
            <p class="lead">
                W Pythonie możemy łatwo otwierać i manipulować plikami przy użyciu funkcji <code>open()</code>.
            </p>
            
            <h3 class="mt-4">Otwieranie pliku</h3>
            <p>Podstawowa składnia otwierania pliku wygląda następująco:</p>
            <pre class="bg-light p-3"><code>f = open("plik.txt", "r")  # Otwiera plik do odczytu
print(f.read())  # Czyta całą zawartość pliku
f.close()  # Zamknięcie pliku</code></pre>

            <h3 class="mt-4">Tryby otwierania plików</h3>
            <p>Metoda <code>open()</code> pozwala otworzyć plik w różnych trybach:</p>
            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>Tryb</th>
                        <th>Opis</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>"r"</code></td>
                        <td>Otwiera plik do odczytu (domyślny tryb)</td>
                    </tr>
                    <tr>
                        <td><code>"w"</code></td>
                        <td>Otwiera plik do zapisu (tworzy nowy, jeśli nie istnieje, nadpisuje istniejący)</td>
                    </tr>
                    <tr>
                        <td><code>"a"</code></td>
                        <td>Otwiera plik do dopisywania (nie nadpisuje istniejącego pliku)</td>
                    </tr>
                    <tr>
                        <td><code>"x"</code></td>
                        <td>Tworzy nowy plik i otwiera go do zapisu (błąd, jeśli plik istnieje)</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="mt-4">Pisanie do pliku</h3>
            <p>Aby zapisać tekst do pliku, używamy trybu <code>"w"</code> lub <code>"a"</code>:</p>
            <pre class="bg-light p-3"><code>f = open("plik.txt", "w")
f.write("Witaj, świecie!")  # Zapis do pliku
f.close()</code></pre>

            <p class="alert alert-info mt-4">Pamiętaj, aby zawsze zamykać pliki po zakończeniu operacji, używając <code>close()</code>.</p>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Obsługa Plików"
}, teacherDb.id);

const exerciseFileHandling = await exercisesController.createExercise({
    lesson_id: fileHandlingLesson1.id,
    question: "Napisz skrypt, który otworzy plik 'example.txt', zapisze do niego tekst 'Witaj w świecie Pythona!' i zamknie plik.",
    code_example: `
# Otwórz plik example.txt w trybie zapisu i dodaj tekst
# Nie zapomnij zamknąć pliku po zakończeniu operacji.

# Twój kod tutaj
`,
    answer_type: "Pole tekstowe",
    correct_answer: `f = open("example.txt", "w")\nf.write("Witaj w świecie Pythona!")\nf.close()`,
}, teacherDb.id);

const fileHandlingLesson2 = await lessonsController.createLesson({
    title: "Odczytywanie pliku linia po linii",
    description: "Dowiedz się, jak odczytywać plik w Pythonie linia po linii.",
    content: `
        <div class="container">
            <h2 class="text-primary">Odczytywanie pliku linia po linii</h2>
            <p class="lead">W Pythonie możemy odczytywać plik linia po linii za pomocą pętli.</p>
            
            <h3 class="mt-4">Metoda <code>readline()</code></h3>
            <p>Funkcja <code>readline()</code> odczytuje jedną linię pliku:</p>
            <pre class="bg-light p-3"><code>f = open("plik.txt", "r")
linia1 = f.readline()
linia2 = f.readline()
print(linia1, linia2)
f.close()</code></pre>

            <h3 class="mt-4">Metoda <code>readlines()</code></h3>
            <p>Funkcja <code>readlines()</code> odczytuje cały plik i zwraca listę jego wierszy:</p>
            <pre class="bg-light p-3"><code>f = open("plik.txt", "r")
linie = f.readlines()
for linia in linie:
    print(linia.strip())  # Usuwa zbędne znaki nowej linii
f.close()</code></pre>

            <h3 class="mt-4">Najlepsza praktyka - użycie <code>with</code></h3>
            <p>Aby automatycznie zamknąć plik po jego użyciu, stosujemy <code>with</code>:</p>
            <pre class="bg-light p-3"><code>with open("plik.txt", "r") as f:
    for linia in f:
        print(linia.strip())</code></pre>

            <p class="alert alert-info mt-4">Użycie <code>with</code> jest bezpieczniejsze, ponieważ automatycznie zamyka plik po zakończeniu operacji.</p>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Obsługa Plików"
}, teacherDb.id);

const exerciseFileReading = await exercisesController.createExercise({
    lesson_id: fileHandlingLesson2.id,
    question: "Napisz skrypt, który odczyta plik 'dane.txt' i wypisze jego zawartość linia po linii, usuwając znaki nowej linii.",
    code_example: `
# Otwórz plik dane.txt i odczytaj jego zawartość linia po linii.
# Wypisz każdą linię na ekranie bez dodatkowych znaków nowej linii.

# Twój kod tutaj
`,
    answer_type: "Pole tekstowe",
    correct_answer: `with open("dane.txt", "r") as f:\n    for linia in f:\n        print(linia.strip())`,
}, teacherDb.id);

const fileHandlingLesson3 = await lessonsController.createLesson({
    title: "Dopisywanie danych do pliku",
    description: "Dowiedz się, jak dopisywać dane do istniejącego pliku w Pythonie.",
    content: `
        <div class="container">
            <h2 class="text-primary">Dopisywanie danych do pliku</h2>
            <p class="lead">Czasami chcemy dodać dane do pliku, zamiast go nadpisywać. Możemy to zrobić za pomocą trybu <code>"a"</code>.</p>
            
            <h3 class="mt-4">Dopisywanie tekstu do pliku</h3>
            <p>Tryb <code>"a"</code> pozwala dodać nowe dane na końcu pliku:</p>
            <pre class="bg-light p-3"><code>f = open("plik.txt", "a")
f.write("\\nNowy wiersz w pliku")
f.close()</code></pre>

            <h3 class="mt-4">Dopisywanie wielu linii</h3>
            <p>Możemy dopisywać wiele linii jednocześnie:</p>
            <pre class="bg-light p-3"><code>with open("plik.txt", "a") as f:
    f.writelines(["\\nLinia 1", "\\nLinia 2"])</code></pre>

            <p class="alert alert-info mt-4">Pamiętaj, że użycie <code>"a"</code> dodaje dane na końcu pliku, nie usuwając poprzednich wpisów.</p>
        </div>
    `,
    difficulty: "Początkujący",
    category: "Obsługa Plików"
}, teacherDb.id);

const exerciseFileAppending = await exercisesController.createExercise({
    lesson_id: fileHandlingLesson3.id,
    question: "Napisz skrypt, który doda do pliku 'notatki.txt' linię 'To jest nowa notatka!'.",
    code_example: `
# Otwórz plik notatki.txt i dopisz do niego nową linię.

# Twój kod tutaj
`,
    answer_type: "Pole tekstowe",
    correct_answer: `with open("notatki.txt", "a") as f:\n    f.write("\\nTo jest nowa notatka!")`,
}, teacherDb.id);

const numpyTutorialLesson = await lessonsController.createLesson({
    title: "NumPy Tutorial",
    description: "Poznaj bibliotekę NumPy i jej zastosowanie w operacjach na tablicach.",
    content: `
        <div class="container">
            <h2 class="text-primary">NumPy - Wprowadzenie</h2>
            <p class="lead">
                NumPy (Numerical Python) to biblioteka Pythona służąca do efektywnej pracy na tablicach i operacji matematycznych.
                Jest podstawą dla innych bibliotek naukowych, takich jak Pandas czy SciPy.
            </p>

            <h3 class="mt-4">Instalacja NumPy</h3>
            <p>NumPy można zainstalować za pomocą pip:</p>
            <pre class="bg-light p-3"><code>pip install numpy</code></pre>

            <h3 class="mt-4">Importowanie NumPy</h3>
            <p>NumPy jest zazwyczaj importowane pod aliasem <code>np</code>:</p>
            <pre class="bg-light p-3"><code>import numpy as np</code></pre>

            <h3 class="mt-4">Tworzenie tablic NumPy</h3>
            <p>Podstawową strukturą danych w NumPy jest <b>ndarray</b>, czyli tablica wielowymiarowa:</p>
            <pre class="bg-light p-3"><code>import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr)</code></pre>

            <h3 class="mt-4">Sprawdzanie wersji NumPy</h3>
            <p>Możemy sprawdzić wersję zainstalowanej biblioteki NumPy:</p>
            <pre class="bg-light p-3"><code>import numpy as np
print(np.__version__)</code></pre>

            <h3 class="mt-4">Tworzenie wielowymiarowych tablic</h3>
            <p>NumPy obsługuje tablice o więcej niż jednym wymiarze:</p>
            <pre class="bg-light p-3"><code>import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr)</code></pre>

            <h3 class="mt-4">Sprawdzanie wymiarów tablicy</h3>
            <p>Aby sprawdzić liczbę wymiarów tablicy, używamy właściwości <code>ndim</code>:</p>
            <pre class="bg-light p-3"><code>import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr.ndim)  # 1

arr2D = np.array([[1, 2, 3], [4, 5, 6]])
print(arr2D.ndim)  # 2</code></pre>

            <h3 class="mt-4">Indeksowanie tablic NumPy</h3>
            <p>Elementy tablicy można pobierać za pomocą indeksów, podobnie jak w listach Pythona:</p>
            <pre class="bg-light p-3"><code>import numpy as np

arr = np.array([10, 20, 30, 40])
print(arr[0])  # 10
print(arr[-1])  # 40</code></pre>

            <h3 class="mt-4">Slicing w NumPy</h3>
            <p>Podobnie jak w listach, NumPy obsługuje operacje "slicing" (przycinania):</p>
            <pre class="bg-light p-3"><code>import numpy as np

arr = np.array([10, 20, 30, 40, 50])
print(arr[1:4])  # [20 30 40]</code></pre>

            <h3 class="mt-4">Podsumowanie</h3>
            <ul>
                <li>NumPy to potężna biblioteka do pracy z tablicami.</li>
                <li>Tablice NumPy są bardziej wydajne niż listy Pythona.</li>
                <li>Obsługuje indeksowanie, slicing i operacje matematyczne.</li>
            </ul>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Python Moduły"
}, teacherDb.id);

const exerciseNumPyTutorial = await exercisesController.createExercise({
    lesson_id: numpyTutorialLesson.id,
    question: "Uzupełnij kod, aby stworzyć tablicę NumPy i uzyskać jej drugi element.",
    code_example: `
import numpy as np

# Stwórz tablicę NumPy z liczbami 10, 20, 30, 40
arr = np.array([_____, _____, _____, _____])

# Pobierz drugi element tablicy
element = arr[_____]

print(element)  # Oczekiwany wynik: 20
    `,
    answer_type: "Pole tekstowe",
    correct_answer: `"10, 20, 30, 40", "1"`,
    explanation: "Tablice NumPy zaczynają indeksowanie od 0, więc drugi element znajduje się pod indeksem 1."
}, teacherDb.id);

const pandasTutorialLesson = await lessonsController.createLesson({
    title: "Pandas Tutorial",
    description: "Poznaj bibliotekę Pandas do analizy i przetwarzania danych.",
    content: `
        <div class="container">
            <h2 class="text-primary">Pandas - Wprowadzenie</h2>
            <p class="lead">
                Pandas to jedna z najpopularniejszych bibliotek Pythona do analizy danych.
                Umożliwia wygodne operacje na strukturach danych, takich jak tabelaryczne <b>DataFrame</b> czy <b>Series</b>.
            </p>

            <h3 class="mt-4">Instalacja Pandas</h3>
            <p>Bibliotekę Pandas można zainstalować za pomocą pip:</p>
            <pre class="bg-light p-3"><code>pip install pandas</code></pre>

            <h3 class="mt-4">Importowanie Pandas</h3>
            <p>Pandas jest zazwyczaj importowane pod aliasem <code>pd</code>:</p>
            <pre class="bg-light p-3"><code>import pandas as pd</code></pre>

            <h3 class="mt-4">Tworzenie obiektu Series</h3>
            <p>Obiekt <b>Series</b> to jednowymiarowa struktura danych, podobna do listy:</p>
            <pre class="bg-light p-3"><code>import pandas as pd

s = pd.Series([10, 20, 30, 40])
print(s)</code></pre>

            <h3 class="mt-4">Tworzenie obiektu DataFrame</h3>
            <p>Obiekt <b>DataFrame</b> to struktura danych w postaci tabeli z indeksami i kolumnami:</p>
            <pre class="bg-light p-3"><code>import pandas as pd

data = {
    "Imię": ["Jan", "Anna", "Piotr"],
    "Wiek": [25, 30, 22]
}

df = pd.DataFrame(data)
print(df)</code></pre>

            <h3 class="mt-4">Wczytywanie danych z pliku CSV</h3>
            <p>Pandas pozwala łatwo wczytać dane z plików CSV:</p>
            <pre class="bg-light p-3"><code>import pandas as pd

df = pd.read_csv("dane.csv")
print(df.head())</code></pre>

            <h3 class="mt-4">Indeksowanie i wybieranie kolumn</h3>
            <p>Możemy wybierać określone kolumny z DataFrame:</p>
            <pre class="bg-light p-3"><code>import pandas as pd

data = {
    "Imię": ["Jan", "Anna", "Piotr"],
    "Wiek": [25, 30, 22]
}

df = pd.DataFrame(data)
print(df["Imię"])</code></pre>

            <h3 class="mt-4">Filtrowanie danych</h3>
            <p>Możemy filtrować dane według warunków:</p>
            <pre class="bg-light p-3"><code>import pandas as pd

data = {
    "Imię": ["Jan", "Anna", "Piotr"],
    "Wiek": [25, 30, 22]
}

df = pd.DataFrame(data)
df_filtr = df[df["Wiek"] > 25]
print(df_filtr)</code></pre>

            <h3 class="mt-4">Podsumowanie</h3>
            <ul>
                <li>Pandas ułatwia operacje na danych tabelarycznych.</li>
                <li>Główne struktury: <b>Series</b> (1D) i <b>DataFrame</b> (2D).</li>
                <li>Pandas obsługuje pliki CSV, JSON, Excel i inne.</li>
                <li>Możemy łatwo filtrować i analizować dane.</li>
            </ul>
        </div>
    `,
    difficulty: "Średniozaawansowany",
    category: "Python Moduły"
}, teacherDb.id);

const exercisePandasTutorial = await exercisesController.createExercise({
    lesson_id: pandasTutorialLesson.id,
    question: "Uzupełnij kod, aby stworzyć DataFrame i wyświetlić osoby starsze niż 25 lat.",
    code_example: `
import pandas as pd

# Stwórz DataFrame z danymi
data = {
    "Imię": ["Krzysztof", "Ewa", "Marek"],
    "Wiek": [23, 35, 27]
}

df = pd.DataFrame(______)

# Filtrowanie osób starszych niż 25 lat
wynik = df[df["Wiek"] _____ _____]

print(wynik)
    `,
    answer_type: "Pole tekstowe",
    correct_answer: `{"'data'"}, ">", "25"`,
    explanation: "Filtrowanie odbywa się za pomocą warunku `df[df['Wiek'] > 25]`."
}, teacherDb.id);


export {
    usersController,
    lessonsController,
    exercisesController,
    studentProgressController,
    submissionsController
};
