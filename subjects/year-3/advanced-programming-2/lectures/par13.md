# المحاضرة 13 — مشروع اللعبة: Alien Invasion (غزو الفضائيين)

> **المادة:** البرمجة المتقدمة 2 (القسم النظري) | **الموضوع:** بناء لعبة كاملة باستخدام `pygame` — من الإعداد وحتى الطلقات والحركة

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| أساسيات Python | `variables`، `functions`، `loops`، `classes` | كود منظّم |
| البرمجة الكائنية OOP | `class`، `__init__`، `self`، `inheritance` | كائنات قابلة لإعادة الاستخدام |
| **مشروع اللعبة — Alien Invasion ← أنت هنا** | `pygame`، `Sprite`، `Group`، `event loop`، `Rect` | لعبة تفاعلية كاملة |
| إضافة الفضائيين والنقاط | `pygame.sprite.groupcollide`، `scoreboard` | لعبة مكتملة المعالم |

> **نوع هذه المحاضرة:** `Game Development` — بناء مشروع تدريجي باستخدام `pygame`، يشمل: إعداد النافذة، إنشاء الكائنات، التحكم بالحركة، وإطلاق الطلقات.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

> **مهم:** كل قسم يبدأ بـ «النص الأصلي يقول» ثم «الشرح المبسّط».

---

### 1. فكرة المشروع العامة — Alien Invasion

#### النص الأصلي يقول:
> "In Alien Invasion, the player controls a ship that appears at the bottom center of the screen. The player can move the ship right and left using the arrow keys and shoot bullets using the spacebar. When the game begins, a fleet of aliens fills the sky and moves across and down the screen. The player shoots and destroys the aliens. If the player shoots all the aliens, a new fleet appears that moves faster than the previous fleet. If any alien hits the player's ship or reaches the bottom of the screen, the player loses a ship. If the player loses three ships, the game ends."

#### الشرح المبسّط:
اللعبة تشبه لعبة «Space Invaders» الكلاسيكية:
- اللاعب يتحكم في مركبة فضائية أسفل الشاشة
- يتحرك يميناً ويساراً بأزرار الأسهم
- يطلق طلقات بزر المسافة `spacebar`
- أسراب من الفضائيين تهجم من الأعلى
- إذا أتمّ اللاعب تدمير السرب كله → يظهر سرب جديد أسرع
- إذا وصل فضائي للمركبة أو قاع الشاشة → يخسر اللاعب مركبة
- خسارة 3 مركبات = نهاية اللعبة

**لماذا؟** هذا المشروع يجمع كل مفاهيم OOP في سياق عملي: الكائنات تتفاعل مع بعضها، كل مكوّن في ملف منفصل، وهناك `game loop` يربطها جميعاً.

💡 **التشبيه:**
> اللعبة مثل مطعم: المدير (`alien_invasion.py`) يُنسّق بين الطاهي (`ship.py`) والنادل (`game_functions.py`) والقائمة (`settings.py`) — كل واحد يؤدّي دوره لكن المطعم يعمل كوحدة واحدة.
> **وجه الشبه:** `alien_invasion.py` = المدير الذي يستدعي الجميع في كل `frame`.

---

### 2. بدء مشروع اللعبة — Starting the Game Project

#### 2.1 إنشاء نافذة `pygame` والاستجابة للمدخلات

#### النص الأصلي يقول:
> "Creating an empty Pygame window to which we can later draw our game elements, such as the ship and the aliens. We'll also have our game respond to user input, set the background color, and load a ship image."

#### الشرح المبسّط:
أول خطوة في أي لعبة `pygame`: إنشاء النافذة وتشغيل الحلقة الرئيسية.

#### 💻 الكود: alien_invasion.py — النسخة الأولى

#### ما هذا الكود؟
> ملف البداية: يُهيّئ `pygame`، يفتح نافذة 800×600، ويبدأ حلقة اللعبة الرئيسية التي تراقب الأحداث وتُحدّث الشاشة باستمرار.

```python
import sys                           # system operations (exit)
import pygame                        # game library

def run_game():
    # Initialize pygame, settings, and screen object
    pygame.init()                    # start all pygame modules
    screen = pygame.display.set_mode((800, 600))  # create 800x600 window
    pygame.display.set_caption("Alien Invasion")  # set window title

    # Start the main loop for the game
    while True:
        # Watch for keyboard and mouse events
        for event in pygame.event.get():     # get all pending events
            if event.type == pygame.QUIT:    # if user closes window
                sys.exit()                   # exit cleanly

        # Make the most recently drawn screen visible
        pygame.display.flip()    # swap buffers — show what we drew

run_game()                       # entry point
```

#### شرح كل سطر:
1. `import sys` → استيراد وحدة النظام — لازمة لـ `sys.exit()` لإغلاق اللعبة نظيفاً
2. `import pygame` → استيراد مكتبة الألعاب الكاملة
3. `pygame.init()` → تشغيل جميع وحدات `pygame` الفرعية (الصوت، الشاشة، الحوادث)
4. `pygame.display.set_mode((800, 600))` → إنشاء سطح عرض `Surface` بحجم 800 عرض × 600 ارتفاع بكسل
5. `pygame.display.set_caption(...)` → تعيين عنوان الشريط العلوي للنافذة
6. `while True:` → الحلقة الأبدية — اللعبة تستمر حتى يُغلقها المستخدم
7. `pygame.event.get()` → استرجاع كل الأحداث المنتظرة (ضغطات، نقرات، إغلاق)
8. `event.type == pygame.QUIT` → الكشف عن حدث الإغلاق (X في النافذة)
9. `sys.exit()` → إنهاء البرنامج بشكل نظيف
10. `pygame.display.flip()` → عرض الإطار المرسوم على الشاشة (double buffering)

**المكتبات المطلوبة (Imports):**
> `import sys` | `import pygame`

**الناتج المتوقع:**
> نافذة سوداء فارغة بعنوان "Alien Invasion" — تستجيب لزر الإغلاق

#### مهم للامتحان ⚠️:
> `pygame.display.flip()` يجب أن يكون في نهاية كل دورة من `while True:` — بدونه لن يظهر أي شيء على الشاشة.

🤔 **تفعيل الفهم:**
> **سؤال:** ماذا يحدث لو أزلت `pygame.init()`؟
> **لماذا هذا مهم؟** لأن `pygame.init()` تُشغّل كل الوحدات الداخلية — بدونها تظهر أخطاء مثل `pygame.error: No video mode has been set`.

---

#### 2.2 تعيين لون الخلفية

#### النص الأصلي يقول:
> `bg_color = (230, 230, 230)` — تُستخدم داخل الحلقة: `screen.fill(bg_color)`

#### الشرح المبسّط:
`pygame` تُمثّل الألوان بنظام `RGB` (أحمر، أخضر، أزرق) — كل قيمة بين 0 و255.

#### 💻 الكود: إضافة لون الخلفية

#### ما هذا الكود؟
> يُعيّن لون خلفية رمادي فاتح `(230, 230, 230)` ويُطبّقه على كامل الشاشة في كل إطار.

```python
# Inside run_game() — after set_caption
bg_color = (230, 230, 230)    # light gray: R=230, G=230, B=230

while True:
    # -- event loop (snip) --

    # Redraw the screen during each pass through the loop
    screen.fill(bg_color)     # paint entire screen with bg_color

    pygame.display.flip()     # show the result
```

#### شرح كل سطر:
1. `bg_color = (230, 230, 230)` → تعريف لون رمادي فاتح — كلما اقتربت القيم من 255 كلما اتجه اللون نحو الأبيض
2. `screen.fill(bg_color)` → طلاء الشاشة كاملها بهذا اللون — **يجب استدعاؤه قبل رسم أي شيء آخر** وإلا ستُغطّي الخلفية كل ما رُسم

**الناتج المتوقع:**
> النافذة الآن رمادية فاتحة بدلاً من السوداء

💡 **التشبيه:**
> `screen.fill(bg_color)` مثل مسح السبورة قبل الكتابة عليها من جديد — بدون المسح ستتراكم الصور فوق بعضها.
> **وجه الشبه:** `fill` = الممحاة، `flip()` = عرض السبورة للطلاب.

---

#### 2.3 إنشاء فئة الإعدادات — Settings Class

#### النص الأصلي يقول:
> "class Settings(): — A class to store all settings for Alien Invasion. — self.screen_width = 800 — self.screen_height = 600 — self.bg_color = (230, 230, 230)"

#### الشرح المبسّط:
بدلاً من وضع الأرقام في كل مكان (hard-coding)، نجمع كل الإعدادات في ملف `settings.py` منفصل. هذا يجعل التعديل أسهل — تغيّر رقماً واحداً في مكان واحد.

#### 💻 الكود: settings.py

#### ما هذا الكود؟
> فئة `Settings` تحمل كل القيم الثابتة للعبة: أبعاد الشاشة، الألوان، سرعة السفينة — بدلاً من تكرارها في كل ملف.

```python
class Settings():
    """A class to store all settings for Alien Invasion."""

    def __init__(self):
        """Initialize the game's settings."""
        # Screen settings
        self.screen_width = 800       # window width in pixels
        self.screen_height = 600      # window height in pixels
        self.bg_color = (230, 230, 230)  # background color (light gray)
```

#### شرح كل سطر:
1. `class Settings():` → تعريف فئة `Settings` — لا ترث من أي فئة (هياكل بيانات بسيطة)
2. `def __init__(self):` → منشئ الفئة — يُنفَّذ تلقائياً عند `Settings()`
3. `self.screen_width = 800` → سمة الشاشة بالبكسل
4. `self.screen_height = 600` → ارتفاع الشاشة
5. `self.bg_color = (230, 230, 230)` → لون الخلفية كـ `tuple` من `RGB`

#### 💻 الكود: تعديل alien_invasion.py لاستخدام Settings

#### ما هذا الكود؟
> ربط `alien_invasion.py` بالفئة الجديدة `Settings` لاستخدام القيم المركزية بدلاً من الأرقام المتفرقة.

```python
import pygame
from settings import Settings       # import our Settings class

def run_game():
    pygame.init()
    ai_settings = Settings()        # create settings instance
    screen = pygame.display.set_mode(
        (ai_settings.screen_width, ai_settings.screen_height))  # use settings
    pygame.display.set_caption("Alien Invasion")

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                import sys; sys.exit()

        screen.fill(ai_settings.bg_color)   # use settings color
        pygame.display.flip()

run_game()
```

#### شرح كل سطر:
1. `from settings import Settings` → استيراد الفئة من الملف `settings.py`
2. `ai_settings = Settings()` → إنشاء كائن إعدادات — `ai` اختصار `alien_invasion`
3. `ai_settings.screen_width` → الوصول للعرض من الكائن بدلاً من الرقم المباشر

#### ⚠️ مهم للامتحان:
> عند استخدام `Settings`، أي تغيير في حجم الشاشة يتم في مكان واحد فقط (`settings.py`) ويسري تلقائياً على كل الكود — هذا مبدأ `DRY (Don't Repeat Yourself)`.

---

### 3. إضافة صورة السفينة — Adding the Ship Image

#### 3.1 إنشاء فئة السفينة — Ship Class

#### النص الأصلي يقول:
> `self.image = pygame.image.load('images/ship.bmp')` — `self.rect = self.image.get_rect()` — `self.rect.centerx = self.screen_rect.centerx` — `self.rect.bottom = self.screen_rect.bottom`

#### الشرح المبسّط:
السفينة تُمثَّل بفئة `Ship` منفصلة في `ship.py`. تعمل الفئة على:
1. تحميل الصورة من ملف `.bmp`
2. الحصول على مستطيل الصورة `rect` لتحديد موضعها
3. وضعها في المنتصف أسفل الشاشة

#### 💻 الكود: ship.py

#### ما هذا الكود؟
> فئة `Ship` تُحمّل صورة المركبة الفضائية وتضعها في منتصف قاع الشاشة، وتوفّر دالة `blitme()` لرسمها في كل إطار.

```python
import pygame                              # for image loading and drawing

class Ship():
    def __init__(self, screen):
        """Initialize the ship and set its starting position."""
        self.screen = screen               # store screen reference

        # Load the ship image and get its rect
        self.image = pygame.image.load('images/ship.bmp')  # load bitmap
        self.rect = self.image.get_rect()  # get bounding rectangle
        self.screen_rect = screen.get_rect()  # get screen dimensions as rect

        # Start each new ship at the bottom center of the screen
        self.rect.centerx = self.screen_rect.centerx  # center horizontally
        self.rect.bottom = self.screen_rect.bottom     # align to bottom

    def blitme(self):
        """Draw the ship at its current location."""
        self.screen.blit(self.image, self.rect)  # draw image at rect position
```

#### شرح كل سطر:
1. `pygame.image.load('images/ship.bmp')` → تحميل صورة بتنسيق `BMP` من المجلد `images/`
2. `self.image.get_rect()` → الحصول على `pygame.Rect` يمثل حدود الصورة (x، y، width، height)
3. `screen.get_rect()` → مستطيل الشاشة كاملة — نستخدمه للتموضع
4. `self.rect.centerx = self.screen_rect.centerx` → توسيط أفقي: مركز السفينة = مركز الشاشة
5. `self.rect.bottom = self.screen_rect.bottom` → قاع السفينة عند قاع الشاشة
6. `self.screen.blit(self.image, self.rect)` → رسم (`blit`) الصورة على الشاشة في موضع `self.rect`

**المكتبات المطلوبة (Imports):**
> `import pygame`

💡 **التشبيه:**
> `Rect` مثل بطاقة هوية الصورة: يحمل موقعها (x, y) وحجمها (width, height) — عند تحريك السفينة نُعدّل `Rect` وليس الصورة نفسها.
> **وجه الشبه:** `Rect` = إطار الصورة المتحرّك، `blit` = لصق الصورة في الإطار.

---

#### 3.2 رسم السفينة على الشاشة

#### النص الأصلي يقول:
> `from ship import Ship` — `ship = Ship(screen)` — `ship.blitme()`

#### الشرح المبسّط:
بعد إنشاء فئة `Ship`، نستوردها في `alien_invasion.py` ونستدعي `ship.blitme()` داخل الحلقة الرئيسية لرسمها في كل إطار.

#### 💻 الكود: alien_invasion.py — إضافة السفينة

#### ما هذا الكود؟
> ربط فئة `Ship` بالحلقة الرئيسية لرسم السفينة على الشاشة في كل دورة.

```python
import pygame
from settings import Settings
from ship import Ship                   # import Ship class

def run_game():
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode(
        (ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")

    ship = Ship(screen)                 # create ship instance

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                import sys; sys.exit()

        screen.fill(ai_settings.bg_color)   # clear screen first
        ship.blitme()                        # draw ship on top
        pygame.display.flip()               # show result

run_game()
```

#### شرح كل سطر:
1. `from ship import Ship` → استيراد فئة `Ship` من `ship.py`
2. `ship = Ship(screen)` → إنشاء كائن السفينة — يمرر `screen` لتعرف أين ترسم نفسها
3. `ship.blitme()` → يُرسم بعد `screen.fill()` حتى لا تُغطيه الخلفية

#### مهم للامتحان ⚠️:
> ترتيب الرسم داخل الحلقة مهم جداً: `fill()` أولاً (مسح) → `blitme()` (رسم العناصر) → `flip()` (عرض). أي تغيير في الترتيب يُسبب مشاكل بصرية.

---

### 4. وحدة دوال اللعبة — The game_functions Module

#### 4.1 دالة check_events()

#### النص الأصلي يقول:
> "def check_events(): — Respond to keypresses and mouse events. — for event in pygame.event.get(): — if event.type == pygame.QUIT: sys.exit()"

#### الشرح المبسّط:
بدلاً من كتابة منطق الأحداث مباشرة في `alien_invasion.py`، ننقله لملف `game_functions.py` — هذا يجعل `alien_invasion.py` أقصر وأوضح.

#### 💻 الكود: game_functions.py — check_events

#### ما هذا الكود؟
> دالة `check_events()` تُعالج كل أحداث لوحة المفاتيح والفأرة وتُنظّف الكود الرئيسي.

```python
import sys                               # for sys.exit()
import pygame                            # for event types

def check_events():
    """Respond to keypresses and mouse events."""
    for event in pygame.event.get():     # iterate all pending events
        if event.type == pygame.QUIT:    # window close button
            sys.exit()                   # terminate program
```

#### شرح كل سطر:
1. `def check_events():` → دالة مستقلة تجمع معالجة الأحداث
2. `pygame.event.get()` → قائمة بكل الأحداث منذ آخر استدعاء
3. `pygame.QUIT` → ثابت يمثل حدث الإغلاق

#### 💻 الكود: alien_invasion.py — استخدام check_events

#### ما هذا الكود؟
> استبدال كود الأحداث المتكرر بـ `import game_functions as gf` واستدعاء `gf.check_events()`.

```python
import pygame
from settings import Settings
from ship import Ship
import game_functions as gf             # import functions module as gf

def run_game():
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode(
        (ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")
    ship = Ship(screen)

    while True:
        gf.check_events()               # handle all events
        screen.fill(ai_settings.bg_color)
        ship.blitme()
        pygame.display.flip()

run_game()
```

#### شرح كل سطر:
1. `import game_functions as gf` → استيراد الوحدة بالاسم المختصر `gf`
2. `gf.check_events()` → استدعاء دالة من الوحدة — أوضح من كتابة الكود مباشرة

---

#### 4.2 دالة update_screen()

#### النص الأصلي يقول:
> "def update_screen(ai_settings, screen, ship): — Update images on the screen and flip to the new screen. — screen.fill(ai_settings.bg_color) — ship.blitme() — pygame.display.flip()"

#### الشرح المبسّط:
مثلما أخرجنا منطق الأحداث لـ `check_events()`، نُخرج منطق الرسم لـ `update_screen()`. الهدف: `while True` في الملف الرئيسي يصبح قصيراً ومقروءاً.

#### 💻 الكود: game_functions.py — update_screen

#### ما هذا الكود؟
> دالة `update_screen()` تتولّى كل عمليات الرسم وتحديث الشاشة في كل إطار.

```python
def update_screen(ai_settings, screen, ship):
    """Update images on the screen and flip to the new screen."""
    # Redraw the screen during each pass through the loop
    screen.fill(ai_settings.bg_color)   # clear with background color
    ship.blitme()                       # draw ship
    # Make the most recently drawn screen visible
    pygame.display.flip()               # swap to display buffer
```

#### شرح كل سطر:
1. `update_screen(ai_settings, screen, ship)` → تستقبل الإعدادات، الشاشة، والسفينة كمعاملات
2. ترتيب الاستدعاءات: `fill()` → `blitme()` → `flip()` — لا يتغيّر هذا الترتيب

#### 💻 الكود: alien_invasion.py — النسخة المحسّنة

#### ما هذا الكود؟
> الحلقة الرئيسية المنظّمة — جسم `while True` أصبح 3 أسطر فقط.

```python
while True:
    gf.check_events()                              # handle events
    gf.update_screen(ai_settings, screen, ship)    # draw everything
```

#### شرح كل سطر:
1. `gf.check_events()` → يُعالج مدخلات المستخدم
2. `gf.update_screen(...)` → يرسم الشاشة ويعرضها

#### ملاحظة:
> فصل المنطق إلى دوال مستقلة يُطبّق مبدأ `Single Responsibility`: كل دالة مسؤولة عن شيء واحد فقط — هذا يُسهّل التصحيح والتطوير.

---

### 5. التحكم في السفينة — Piloting the Ship

#### 5.1 الاستجابة لضغطة مفتاح واحدة

#### النص الأصلي يقول:
> "elif event.type == pygame.KEYDOWN: if event.key == pygame.K_RIGHT: # Move the ship to the right. ship.rect.centerx += 1"

#### الشرح المبسّط:
عند الضغط على السهم الأيمن، نُزيد `centerx` للسفينة بمقدار 1 بكسل. لكن هذه الطريقة تتحرك بكسلاً واحداً فقط عند كل ضغطة — غير مريح للاعب.

#### 💻 الكود: game_functions.py — استجابة بسيطة للمفاتيح

#### ما هذا الكود؟
> إضافة منطق الحركة الأساسية — تحريك السفينة يميناً بكسل واحد عند الضغط.

```python
def check_events(ship):
    """Respond to keypresses and mouse events."""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:      # key pressed
            if event.key == pygame.K_RIGHT:     # right arrow key
                # Move the ship to the right
                ship.rect.centerx += 1          # shift 1 pixel right
```

#### شرح كل سطر:
1. `event.type == pygame.KEYDOWN` → حدث ضغط مفتاح (لحظة الضغط فقط)
2. `event.key == pygame.K_RIGHT` → التحقق أن المفتاح هو السهم الأيمن
3. `ship.rect.centerx += 1` → تحريك السفينة بكسل واحد يميناً

---

#### 5.2 السماح بالحركة المستمرة — Continuous Movement

#### النص الأصلي يقول:
> "self.moving_right = False — def update(self): if self.moving_right: self.rect.centerx += 1"

#### الشرح المبسّط:
الحل: نستخدم `flag` (راية) داخل `Ship`. عند ضغط المفتاح → `moving_right = True`. عند رفعه → `moving_right = False`. في كل إطار نستدعي `ship.update()` لتحريكها ما دام الضغط مستمراً.

**لماذا؟** `KEYDOWN` يُطلَق مرة واحدة لحظة الضغط، لكن اللاعب يريد حركة مستمرة ما دام الإصبع على المفتاح. الراية تحل هذه المشكلة.

#### 🔄 قبل / بعد: نظام الحركة

**قبل (بسيط — غير مريح):**
```python
# Moves only once per keypress
if event.key == pygame.K_RIGHT:
    ship.rect.centerx += 1
```

**بعد (مستمر — مريح):**
```python
# In Ship.__init__: flag
self.moving_right = False

# In check_events: set flag
if event.key == pygame.K_RIGHT:
    ship.moving_right = True

# In Ship.update(): act on flag
if self.moving_right:
    self.rect.centerx += 1
```

**ماذا تغيّر؟** الحركة أصبحت مستمرة ما دام المفتاح مضغوطاً بدلاً من مجرد نقلة واحدة.

#### 💻 الكود: ship.py — إضافة update() والراية

#### ما هذا الكود؟
> إضافة راية `moving_right` ودالة `update()` لتمكين الحركة المستمرة.

```python
class Ship():
    def __init__(self, screen):
        # -- previous code (snip) --
        self.screen_rect = screen.get_rect()
        self.rect.centerx = self.screen_rect.centerx
        self.rect.bottom = self.screen_rect.bottom

        # Movement flag — False means not moving
        self.moving_right = False          # right movement flag

    def update(self):
        """Update the ship's position based on the movement flag."""
        if self.moving_right:             # if flag is True
            self.rect.centerx += 1        # shift one pixel right

    def blitme(self):
        """Draw the ship at its current location."""
        self.screen.blit(self.image, self.rect)
```

#### شرح كل سطر:
1. `self.moving_right = False` → الراية تبدأ بـ `False` (السفينة ثابتة)
2. `def update(self):` → دالة تُستدعى في كل إطار لتُحدّث الموضع
3. `if self.moving_right: self.rect.centerx += 1` → تحرك فقط إذا كانت الراية `True`

#### 💻 الكود: game_functions.py — رفع وخفض الراية

#### ما هذا الكود؟
> ضبط الراية عند KEYDOWN وإعادة تعيينها عند KEYUP لتمكين التوقف عند رفع المفتاح.

```python
def check_events(ship):
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:     # key pressed
            if event.key == pygame.K_RIGHT:
                ship.moving_right = True        # start moving
        elif event.type == pygame.KEYUP:       # key released
            if event.key == pygame.K_RIGHT:
                ship.moving_right = False       # stop moving
```

#### شرح كل سطر:
1. `pygame.KEYDOWN` → لحظة الضغط → `True`
2. `pygame.KEYUP` → لحظة الرفع → `False`

#### 💻 الكود: alien_invasion.py — استدعاء update()

#### ما هذا الكود؟
> إضافة `ship.update()` في الحلقة الرئيسية لتُنفَّذ في كل إطار.

```python
while True:
    gf.check_events(ship)                       # handle input → set flags
    ship.update()                               # move ship based on flags
    gf.update_screen(ai_settings, screen, ship) # draw
```

---

#### 5.3 التحرك يميناً ويساراً معاً

#### النص الأصلي يقول:
> "self.moving_right = False — self.moving_left = False — if self.moving_right: self.rect.centerx += 1 — if self.moving_left: self.rect.centerx -= 1"

#### الشرح المبسّط:
نضيف راية ثانية `moving_left` ونُعالج مفتاح السهم الأيسر بنفس الأسلوب.

#### 💻 الكود: ship.py — حركة ثنائية الاتجاه

#### ما هذا الكود؟
> إضافة راية `moving_left` وتحديث `update()` لدعم الحركة في الاتجاهين.

```python
def __init__(self, screen):
    # -- snip --
    # Movement flags
    self.moving_right = False    # right flag
    self.moving_left = False     # left flag

def update(self):
    """Update the ship's position based on movement flags."""
    if self.moving_right:
        self.rect.centerx += 1    # move right
    if self.moving_left:
        self.rect.centerx -= 1    # move left
```

#### 💻 الكود: game_functions.py — معالجة كلا المفتاحين

#### ما هذا الكود؟
> توسيع `check_events()` لمعالجة السهم الأيسر بجانب الأيمن.

```python
elif event.type == pygame.KEYDOWN:
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True     # right pressed
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True      # left pressed

elif event.type == pygame.KEYUP:
    if event.key == pygame.K_RIGHT:
        ship.moving_right = False    # right released
    elif event.key == pygame.K_LEFT:
        ship.moving_left = False     # left released
```

---

#### 5.4 ضبط سرعة السفينة

#### النص الأصلي يقول:
> "self.ship_speed_factor = 1.5"

#### الشرح المبسّط:
بدلاً من الحركة بكسل واحد (عدد صحيح)، نستخدم عدداً عشرياً `float` لضبط السرعة بدقة أكبر. `1.5` بكسل في كل إطار أسرع من `1` وأبطأ من `2`.

#### 💻 الكود: settings.py — إضافة سرعة السفينة

#### ما هذا الكود؟
> إضافة `ship_speed_factor` لتحديد سرعة السفينة بقيمة عشرية قابلة للتعديل.

```python
class Settings():
    def __init__(self):
        # Screen settings
        self.screen_width = 800
        self.screen_height = 600
        self.bg_color = (230, 230, 230)
        # Ship settings
        self.ship_speed_factor = 1.5     # pixels per frame (float)
```

#### 💻 الكود: ship.py — استخدام السرعة العشرية

#### ما هذا الكود؟
> تعديل `Ship` لاستخدام `ai_settings` وتخزين الموضع كـ `float` لدعم السرعة العشرية.

```python
class Ship():
    def __init__(self, ai_settings, screen):     # accept settings
        """Initialize the ship and set its starting position."""
        self.screen = screen
        self.ai_settings = ai_settings           # store settings reference
        # -- load image, get rect (snip) --

        # Store a decimal value for the ship's center
        self.center = float(self.rect.centerx)   # float for precision
        # Movement flags
        self.moving_right = False
        self.moving_left = False

    def update(self):
        """Update the ship's position based on movement flags."""
        # Update the ship's center value, not the rect
        if self.moving_right:
            self.center += self.ai_settings.ship_speed_factor   # add speed
        if self.moving_left:
            self.center -= self.ai_settings.ship_speed_factor   # subtract speed
        # Update rect object from self.center
        self.rect.centerx = self.center      # convert float back to int for rect
```

#### شرح كل سطر:
1. `self.center = float(self.rect.centerx)` → نُخزّن الموضع كـ `float` لأن `Rect` يقبل فقط عدداً صحيحاً — لو أضفنا `1.5` مباشرة لـ `rect.centerx` ستُقرَّب وتُفقد الدقة
2. `self.center += self.ai_settings.ship_speed_factor` → نُضيف للـ `float` بدقة
3. `self.rect.centerx = self.center` → في النهاية نُحدّث `rect` من `self.center`

💡 **التشبيه:**
> `self.center` مثل الـ GPS الدقيق لمركبة، و`self.rect.centerx` مثل خانة النظام القديم التي تقبل أرقاماً صحيحة فقط — نحسب بدقة ثم نُدرج.
> **وجه الشبه:** `float` = دقة GPS، `int` = خانة الكيلومترات الصحيحة.

---

#### 5.5 تحديد نطاق حركة السفينة — Limiting the Ship's Range

#### النص الأصلي يقول:
> "if self.moving_right and self.rect.right < self.screen_rect.right: — if self.moving_left and self.rect.left > 0:"

#### الشرح المبسّط:
بدون قيود، ستخرج السفينة من حدود الشاشة. نضيف شرطاً: تتحرك يميناً فقط إذا لم يتجاوز طرفها الأيمن حد الشاشة الأيمن، وتتحرك يساراً فقط إذا لم يتجاوز طرفها الأيسر حد الشاشة الأيسر (0).

#### 💻 الكود: ship.py — تقييد الحركة

#### ما هذا الكود؟
> إضافة شروط حدود الشاشة لمنع السفينة من الخروج.

```python
def update(self):
    """Update the ship's position based on movement flags."""
    # Update the ship's center value, not the rect
    if self.moving_right and self.rect.right < self.screen_rect.right:
        self.center += self.ai_settings.ship_speed_factor   # move right if within bounds
    if self.moving_left and self.rect.left > 0:
        self.center -= self.ai_settings.ship_speed_factor   # move left if within bounds
    # Update rect object from self.center
    self.rect.centerx = self.center
```

#### شرح كل سطر:
1. `self.rect.right < self.screen_rect.right` → تحقق: الحافة اليمنى للسفينة لم تصل لحافة الشاشة اليمنى
2. `self.rect.left > 0` → تحقق: الحافة اليسرى للسفينة لم تصل لبداية الشاشة (x=0)

#### مهم للامتحان ⚠️:
> `self.rect.right` = إحداثي الحافة اليمنى = `x + width`، و`self.rect.left` = إحداثي الحافة اليسرى = `x`. هذه خصائص مدمجة في `pygame.Rect`.

---

#### 5.6 إعادة هيكلة check_events() — Refactoring

#### النص الأصلي يقول:
> "def check_keydown_events(event, ship): — def check_keyup_events(event, ship): — def check_events(ship): … check_keydown_events(event, ship) … check_keyup_events(event, ship)"

#### الشرح المبسّط:
مع نمو الكود، تصبح `check_events()` طويلة. نُقسّمها إلى 3 دوال: دالة رئيسية تُوزّع الأحداث، ودالتان للضغط والرفع.

#### 💻 الكود: game_functions.py — الدوال المفككة

#### ما هذا الكود؟
> إعادة هيكلة `check_events()` إلى 3 دوال منفصلة أصغر وأوضح.

```python
def check_keydown_events(event, ship):
    """Respond to keypresses."""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True     # start moving right
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True      # start moving left

def check_keyup_events(event, ship):
    """Respond to key releases."""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = False    # stop moving right
    elif event.key == pygame.K_LEFT:
        ship.moving_left = False     # stop moving left

def check_events(ship):
    """Respond to keypresses and mouse events."""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            check_keydown_events(event, ship)    # delegate to helper
        elif event.type == pygame.KEYUP:
            check_keyup_events(event, ship)      # delegate to helper
```

#### شرح كل سطر:
1. `check_keydown_events(event, ship)` → دالة مساعدة لمعالجة الضغط فقط
2. `check_keyup_events(event, ship)` → دالة مساعدة للرفع فقط
3. `check_events()` → تبقى الدالة الرئيسية لكن تُفوّض العمل للمساعدتين

💡 **التشبيه:**
> `check_events()` مثل مدير استقبال في فندق: يستقبل كل الطلبات ثم يُوجّهها للموظف المختص (`check_keydown_events` أو `check_keyup_events`).
> **وجه الشبه:** التفويض = `delegation` في هندسة البرمجيات.

---

### 6. إطلاق الطلقات — Shooting Bullets

#### 6.1 إضافة إعدادات الطلقات

#### النص الأصلي يقول:
> "self.bullet_speed_factor = 1 — self.bullet_width = 3 — self.bullet_height = 15 — self.bullet_color = 60, 60, 60 — self.bullets_allowed = 3"

#### الشرح المبسّط:
نُضيف إعدادات الطلقات لـ `Settings`: الحجم، اللون، السرعة، والحد الأقصى لعدد الطلقات المسموح بوجودها على الشاشة في آنٍ واحد.

#### 💻 الكود: settings.py — إعدادات الطلقات

#### ما هذا الكود؟
> إضافة معاملات الطلقات لفئة `Settings` لمركزة كل القيم القابلة للتعديل.

```python
# Bullet settings
self.bullet_speed_factor = 1       # pixels per frame (upward)
self.bullet_width = 3              # width in pixels
self.bullet_height = 15            # height in pixels
self.bullet_color = 60, 60, 60     # dark gray (R, G, B)
self.bullets_allowed = 3           # max bullets on screen at once
```

#### شرح كل سطر:
1. `bullet_speed_factor = 1` → سرعة الطلقة صعوداً (بكسل/إطار)
2. `bullet_width = 3` → عرض ضيّق — يبدو كخط رفيع
3. `bullet_height = 15` → طول متوسط مرئي
4. `bullet_color = 60, 60, 60` → رمادي داكن — يتميّز عن الخلفية الفاتحة
5. `bullets_allowed = 3` → تقييد عدد الطلقات لزيادة صعوبة اللعبة

---

#### 6.2 إنشاء فئة الطلقة — Bullet Class

#### النص الأصلي يقول:
> "class Bullet(Sprite): — self.rect = pygame.Rect(0, 0, ai_settings.bullet_width, ai_settings.bullet_height) — self.rect.centerx = ship.rect.centerx — self.rect.top = ship.rect.top — self.y = float(self.rect.y) — def update(self): self.y -= self.speed_factor — def draw_bullet(self): pygame.draw.rect(self.screen, self.color, self.rect)"

#### الشرح المبسّط:
الطلقة كائن `Sprite` (من `pygame.sprite.Sprite`). تبدأ من أعلى السفينة وتتحرك للأعلى (y تتناقص لأن الإحداثيات من الأعلى للأسفل في `pygame`). تُرسم كمستطيل ملوّن لا كصورة.

#### 💻 الكود: bullet.py — فئة الطلقة الكاملة

#### ما هذا الكود؟
> فئة `Bullet` ترث من `Sprite` — تُنشأ عند قاع السفينة وتتحرك للأعلى بسرعة محددة وترسم نفسها كمستطيل.

```python
import pygame
from pygame.sprite import Sprite     # base class for game objects

class Bullet(Sprite):
    """A class to manage bullets fired from the ship."""

    def __init__(self, ai_settings, screen, ship):
        """Create a bullet object at the ship's current position."""
        super(Bullet, self).__init__()   # initialize parent Sprite
        self.screen = screen

        # Create a bullet rect at (0,0) and then set correct position
        self.rect = pygame.Rect(0, 0,
            ai_settings.bullet_width,
            ai_settings.bullet_height)   # create rectangle with settings size

        self.rect.centerx = ship.rect.centerx  # align center with ship center
        self.rect.top = ship.rect.top          # start at ship's top edge

        # Store the bullet's position as a decimal value
        self.y = float(self.rect.y)            # float for smooth movement

        self.color = ai_settings.bullet_color         # bullet color
        self.speed_factor = ai_settings.bullet_speed_factor  # bullet speed

    def update(self):
        """Move the bullet up the screen."""
        # Update the decimal position of the bullet
        self.y -= self.speed_factor    # subtract = move up (y=0 is top)
        # Update the rect position
        self.rect.y = self.y           # sync rect to float position

    def draw_bullet(self):
        """Draw the bullet to the screen."""
        pygame.draw.rect(self.screen, self.color, self.rect)  # draw filled rect
```

#### شرح كل سطر:
1. `class Bullet(Sprite):` → ترث من `pygame.sprite.Sprite` للاستفادة من إدارة المجموعات
2. `super(Bullet, self).__init__()` → استدعاء منشئ `Sprite` الأب
3. `pygame.Rect(0, 0, width, height)` → إنشاء `Rect` في الموضع (0,0) أولاً ثم نُحدّده
4. `self.rect.centerx = ship.rect.centerx` → الطلقة تنطلق من مركز السفينة أفقياً
5. `self.rect.top = ship.rect.top` → الطلقة تبدأ من أعلى السفينة
6. `self.y -= self.speed_factor` → تحرك للأعلى: في `pygame` y=0 أعلى الشاشة، لذا التناقص = الصعود
7. `pygame.draw.rect(screen, color, rect)` → رسم مستطيل مُعبَّأ بالألوان

**المكتبات المطلوبة (Imports):**
> `import pygame` | `from pygame.sprite import Sprite`

💡 **التشبيه:**
> إحداثيات `pygame` مقلوبة كأنك تنظر لشاشة الكمبيوتر: y=0 في الأعلى وتزيد للأسفل — لذا لتحريك الطلقة للأعلى نطرح من y.
> **وجه الشبه:** y في pygame = عمق القائمة — كلما قلّت كلما ارتفعت.

#### مهم للامتحان ⚠️:
> في `pygame`: الزاوية العلوية اليسرى هي (0, 0). y تزيد نحو الأسفل. لذا تحريك شيء للأعلى = طرح من y.

---

#### 6.3 تخزين الطلقات في مجموعة — Storing Bullets in a Group

#### النص الأصلي يقول:
> "from pygame.sprite import Group — bullets = Group() — bullets.update() — gf.update_screen(ai_settings, screen, ship, bullets)"

#### الشرح المبسّط:
`pygame.sprite.Group` وعاء خاص يحمل مجموعة `Sprite`. مميزاته: `update()` واحدة تُحدّث كل العناصر، و`sprites()` تُعطيك قائمة بها جميعاً.

#### 💻 الكود: alien_invasion.py — إضافة مجموعة الطلقات

#### ما هذا الكود؟
> إنشاء `Group` لتخزين الطلقات وإضافة `bullets.update()` و`gf.update_screen(...)` الموسّع.

```python
import pygame
from pygame.sprite import Group          # import Group class
from settings import Settings
from ship import Ship
import game_functions as gf

def run_game():
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode(
        (ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")
    ship = Ship(ai_settings, screen)
    # Make a group to store bullets in
    bullets = Group()                    # empty sprite group

    while True:
        gf.check_events(ai_settings, screen, ship, bullets)  # pass bullets
        ship.update()
        bullets.update()                 # update all bullets in group
        gf.update_screen(ai_settings, screen, ship, bullets)

run_game()
```

#### شرح كل سطر:
1. `from pygame.sprite import Group` → استيراد فئة المجموعة
2. `bullets = Group()` → مجموعة فارغة — ستُملأ بالطلقات عند الإطلاق
3. `bullets.update()` → تُستدعى `update()` لكل طلقة في المجموعة — طلقة واحدة استدعاء واحد

---

#### 6.4 إطلاق الطلقات عند ضغط زر المسافة

#### النص الأصلي يقول:
> "elif event.key == pygame.K_SPACE: — new_bullet = Bullet(ai_settings, screen, ship) — bullets.add(new_bullet)"

#### الشرح المبسّط:
عند ضغط `spacebar`: نُنشئ كائن `Bullet` جديداً ونُضيفه للمجموعة `bullets`. كل ما في المجموعة يتحرك تلقائياً عند `bullets.update()`.

#### 💻 الكود: game_functions.py — check_keydown_events مع الطلقات

#### ما هذا الكود؟
> إضافة منطق إطلاق الطلقة عند `K_SPACE` وتخزينها في `bullets`.

```python
from bullet import Bullet    # import Bullet class

def check_keydown_events(event, ai_settings, screen, ship, bullets):
    """Respond to keypresses."""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True
    elif event.key == pygame.K_SPACE:
        # Create a new bullet and add it to the bullets group
        new_bullet = Bullet(ai_settings, screen, ship)   # create bullet at ship pos
        bullets.add(new_bullet)                          # add to group
```

#### شرح كل سطر:
1. `event.key == pygame.K_SPACE` → الكشف عن ضغط المسافة
2. `Bullet(ai_settings, screen, ship)` → إنشاء طلقة عند موضع السفينة الحالي
3. `bullets.add(new_bullet)` → إضافتها للمجموعة — `update()` ستتكفّل بها

---

#### 6.5 رسم الطلقات وحذف القديمة منها

#### النص الأصلي يقول:
> "for bullet in bullets.sprites(): bullet.draw_bullet() — for bullet in bullets.copy(): if bullet.rect.bottom <= 0: bullets.remove(bullet)"

#### الشرح المبسّط:
- **الرسم:** نمرّ على كل طلقة في المجموعة ونستدعي `draw_bullet()`
- **الحذف:** نفحص كل طلقة — إذا خرجت من الشاشة (rect.bottom ≤ 0) نحذفها لتوفير الذاكرة

#### 💻 الكود: game_functions.py — update_screen مع الطلقات

#### ما هذا الكود؟
> تحديث `update_screen()` لرسم كل الطلقات قبل رسم السفينة.

```python
def update_screen(ai_settings, screen, ship, bullets):
    """Update images on the screen and flip to the new screen."""
    screen.fill(ai_settings.bg_color)          # clear screen

    # Redraw all bullets behind ship and aliens
    for bullet in bullets.sprites():           # iterate all bullets
        bullet.draw_bullet()                   # draw each bullet

    ship.blitme()                              # draw ship on top
    pygame.display.flip()                      # show result
```

#### 💻 الكود: alien_invasion.py — حذف الطلقات القديمة

#### ما هذا الكود؟
> حذف الطلقات التي تجاوزت حدود الشاشة العليا لتوفير الذاكرة.

```python
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()

    # Get rid of bullets that have disappeared
    for bullet in bullets.copy():            # copy() to allow removal during loop
        if bullet.rect.bottom <= 0:          # bullet passed top of screen
            bullets.remove(bullet)           # remove from group

    print(len(bullets))                      # debug: show bullet count
    gf.update_screen(ai_settings, screen, ship, bullets)
```

#### شرح كل سطر:
1. `bullets.copy()` → نسخة للتكرار — **لا يجوز** حذف عناصر من مجموعة أثناء التكرار عليها مباشرة
2. `bullet.rect.bottom <= 0` → الطلقة وصلت أو تجاوزت قمة الشاشة
3. `bullets.remove(bullet)` → حذف من المجموعة — سيتوقف `update()` عن استدعائها
4. `print(len(bullets))` → طباعة تشخيصية للتحقق من عمل الحذف

#### مهم للامتحان ⚠️:
> دائماً استخدم `bullets.copy()` عند الحذف أثناء التكرار — التكرار على المجموعة الأصلية مع الحذف يُسبب `RuntimeError: dictionary changed size during iteration`.

---

#### 6.6 تحديد عدد الطلقات — Limiting the Number of Bullets

#### النص الأصلي يقول:
> "if len(bullets) < ai_settings.bullets_allowed: — new_bullet = Bullet(...) — bullets.add(new_bullet)"

#### الشرح المبسّط:
نتحقق من عدد الطلقات الحالية قبل إطلاق طلقة جديدة. إذا وصلنا للحد (`bullets_allowed = 3`)، لا نُضيف طلقة جديدة.

#### 💻 الكود: game_functions.py — تقييد الطلقات

#### ما هذا الكود؟
> إضافة شرط التحقق من عدد الطلقات قبل إنشاء طلقة جديدة.

```python
elif event.key == pygame.K_SPACE:
    # Create a new bullet and add it to the bullets group
    if len(bullets) < ai_settings.bullets_allowed:  # check limit
        new_bullet = Bullet(ai_settings, screen, ship)
        bullets.add(new_bullet)
```

---

#### 6.7 إنشاء دالة fire_bullet()

#### النص الأصلي يقول:
> "def fire_bullet(ai_settings, screen, ship, bullets): — Fire a bullet if limit not reached yet. — if len(bullets) < ai_settings.bullets_allowed: new_bullet = Bullet(...) bullets.add(new_bullet)"

#### الشرح المبسّط:
نُخرج منطق الإطلاق إلى دالة `fire_bullet()` مستقلة — هذا يجعل `check_keydown_events()` أنظف.

#### 💻 الكود: game_functions.py — fire_bullet()

#### ما هذا الكود؟
> دالة `fire_bullet()` تتحقق من الحد ثم تُطلق الطلقة — يمكن استدعاؤها من أي مكان.

```python
def fire_bullet(ai_settings, screen, ship, bullets):
    """Fire a bullet if limit not reached yet."""
    # Create a new bullet and add it to the bullets group
    if len(bullets) < ai_settings.bullets_allowed:    # check limit
        new_bullet = Bullet(ai_settings, screen, ship) # create bullet
        bullets.add(new_bullet)                        # add to group

def check_keydown_events(event, ai_settings, screen, ship, bullets):
    """Respond to keypresses."""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True
    elif event.key == pygame.K_SPACE:
        fire_bullet(ai_settings, screen, ship, bullets)  # delegate
```

---

### 7. ملخص بنية الملفات — A Quick Recap

#### النص الأصلي يقول:
> "alien_invasion.py — The main file creates important objects: ai_settings, screen, ship, bullets. Contains the main while loop calling check_events(), ship.update(), bullets.update(), and update_screen(). The other files — settings.py, game_functions.py, ship.py — contain code imported directly or indirectly into this file."

| الملف | المحتوى | الدور |
| --- | --- | --- |
| `alien_invasion.py` | `run_game()`، الحلقة الرئيسية | نقطة البداية — المنسّق العام |
| `settings.py` | `class Settings` | تخزين كل الإعدادات |
| `game_functions.py` | `check_events()`، `update_screen()`، `fire_bullet()` | منطق اللعبة |
| `ship.py` | `class Ship` | السفينة — حركة ورسم |
| `bullet.py` | `class Bullet(Sprite)` | الطلقة — حركة ورسم |
| `images/ship.bmp` | ملف الصورة | أصل مرئي |

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `pygame` | مكتبة بايثون لبناء الألعاب ثنائية الأبعاد | `import pygame` |
| `Surface` | سطح رسم في `pygame` | الشاشة الرئيسية `screen` |
| `Rect` | مستطيل يمثل موضع وحجم كائن | `self.rect = image.get_rect()` |
| `Sprite` | فئة أساسية لكائنات اللعبة في `pygame` | `class Bullet(Sprite)` |
| `Group` | وعاء لتجميع `Sprite` وتحديثها دفعة واحدة | `bullets = Group()` |
| `event loop` | حلقة `while True` التي تعالج الأحداث | أساس كل لعبة `pygame` |
| `blit` | رسم صورة على `Surface` | `screen.blit(image, rect)` |
| `flip` | عرض الإطار المرسوم على الشاشة | `pygame.display.flip()` |
| `KEYDOWN` | حدث ضغط مفتاح | `event.type == pygame.KEYDOWN` |
| `KEYUP` | حدث رفع مفتاح | `event.type == pygame.KEYUP` |
| `moving_right` / `moving_left` | راية تتحكم باتجاه حركة السفينة | `False` افتراضياً |
| `ship_speed_factor` | سرعة السفينة بالبكسل في الإطار الواحد | `1.5` |
| `bullets_allowed` | الحد الأقصى للطلقات على الشاشة | `3` |

---

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `pygame.init()` | تهيئة جميع وحدات `pygame` | أول شيء يُنفَّذ |
| `pygame.display.set_mode()` | إنشاء نافذة اللعبة | تُعيد `Surface` |
| `pygame.display.flip()` | عرض الإطار المحدّث | في نهاية كل دورة |
| `pygame.event.get()` | استرجاع الأحداث المعلّقة | تُستدعى كل إطار |
| `pygame.image.load()` | تحميل ملف صورة | يدعم `.bmp`, `.png`, `.jpg` |
| `pygame.draw.rect()` | رسم مستطيل ملوّن | للطلقات بدلاً من الصور |
| `screen.fill(color)` | طلاء الشاشة كاملها بلون | يُمسح محتوى الإطار السابق |
| `Group.update()` | استدعاء `update()` لكل أعضاء المجموعة | تحريك كل الطلقات دفعة |
| `Group.sprites()` | إرجاع قائمة بكل أعضاء المجموعة | للتكرار والرسم |
| `Group.copy()` | نسخة من المجموعة للتكرار الآمن | عند الحذف أثناء loop |

---

### جداول مقارنات سريعة

| المقارنة | KEYDOWN | KEYUP |
| --- | --- | --- |
| التوقيت | لحظة الضغط | لحظة الرفع |
| الاستخدام | تعيين الراية `True` | تعيين الراية `False` |
| التكرار | مرة واحدة (أو مع `repeat`) | مرة واحدة |

| المقارنة | `pygame.Rect` | موضع `float` |
| --- | --- | --- |
| النوع | أعداد صحيحة فقط | عشرية |
| الاستخدام | الرسم والتصادم | الحساب الدقيق |
| مثال | `self.rect.centerx` | `self.center` |

---

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| مكونات `pygame` | `Surface`, `Rect`, `Sprite`, `Group`, `event`, `KEYDOWN`, `KEYUP`, `QUIT` |
| دوال اللعبة | `check_events()`, `update_screen()`, `fire_bullet()`, `check_keydown_events()`, `check_keyup_events()` |
| فئات اللعبة | `Settings`, `Ship`, `Bullet` |
| إعدادات | `ship_speed_factor`, `bullet_speed_factor`, `bullets_allowed`, `bg_color` |
| أساليب الرسم | `blit()`, `flip()`, `fill()`, `draw.rect()`, `draw_bullet()` |

---

### أبرز النقاط الذهبية
1. ترتيب الرسم لا يتغيّر: `fill()` → العناصر → `flip()`
2. y=0 في الأعلى — تحريك للأعلى = طرح من y
3. استخدم `self.center` (`float`) لحساب الحركة، و`self.rect.centerx` فقط للرسم
4. استخدم `bullets.copy()` عند الحذف داخل الحلقة
5. فصل الكود إلى ملفات منفصلة (`settings.py`, `game_functions.py`, `ship.py`) يُسهّل الصيانة
6. `bullets_allowed` يتحكم في صعوبة اللعبة — قيمة أصغر = أصعب

---

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| `pygame.display.flip()` قبل الرسم | يجب أن يكون بعد كل عمليات `blit()` |
| `screen.fill()` بعد `blitme()` | سيُغطّي الخلفية على العناصر — `fill()` أولاً |
| حذف من `bullets` أثناء التكرار عليها | استخدم `bullets.copy()` |
| نسيان `pygame.init()` | تظهر أخطاء غير واضحة عند محاولة فتح النافذة |
| إضافة سرعة عشرية مباشرة لـ `rect.centerx` | استخدم `self.center` (`float`) ثم `rect.centerx = self.center` |
| نسيان `ship.update()` في الحلقة | السفينة لا تتحرك رغم ضغط المفاتيح |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: إعداد نافذة اللعبة

> تهيئة `pygame` وفتح النافذة وتشغيل الحلقة الرئيسية.

```algorithm
1 | pygame.init() | pygame | تشغيل جميع وحدات pygame
2 | Settings() | settings.py | إنشاء كائن الإعدادات
3 | pygame.display.set_mode((w,h)) | pygame | فتح نافذة بالأبعاد المحددة
4 | pygame.display.set_caption(title) | pygame | تعيين عنوان الشريط
5 | while True | Python | بدء الحلقة الأبدية
6 | pygame.event.get() | pygame | استرجاع الأحداث
7 | screen.fill(bg_color) | pygame | مسح الإطار
8 | pygame.display.flip() | pygame | عرض الإطار
```

#### نقاط التنفيذ:
- `pygame.init()` يجب أن يسبق أي استخدام لـ `pygame`
- `flip()` يجب أن يكون في نهاية كل دورة

---

#### ⚙️ الخطوات / الخوارزمية: إضافة السفينة

> تحميل صورة السفينة وتموضعها وربطها بالحلقة الرئيسية.

```algorithm
1 | pygame.image.load('images/ship.bmp') | ship.py | تحميل صورة السفينة
2 | image.get_rect() | pygame | الحصول على Rect الصورة
3 | screen.get_rect() | pygame | الحصول على أبعاد الشاشة
4 | rect.centerx = screen_rect.centerx | ship.py | توسيط أفقي
5 | rect.bottom = screen_rect.bottom | ship.py | وضع في القاع
6 | ship = Ship(ai_settings, screen) | alien_invasion.py | إنشاء كائن السفينة
7 | ship.blitme() | alien_invasion.py | رسم السفينة في كل إطار
```

#### نقاط التنفيذ:
- الصورة يجب أن تكون في مجلد `images/` المجاور للكود
- `blitme()` تُستدعى بعد `screen.fill()` وقبل `flip()`

---

#### ⚙️ الخطوات / الخوارزمية: تحريك السفينة بشكل مستمر

> نظام الرايات لتمكين الحركة المستمرة ما دام المفتاح مضغوطاً.

```algorithm
1 | self.moving_right = False | ship.py __init__ | تعريف الراية الافتراضية
2 | KEYDOWN + K_RIGHT | game_functions.py | رفع الراية إلى True
3 | KEYUP + K_RIGHT | game_functions.py | خفض الراية إلى False
4 | ship.update() | alien_invasion.py | استدعاء في كل إطار
5 | if self.moving_right: center += speed | ship.py update() | التحريك بناءً على الراية
6 | rect.centerx = self.center | ship.py update() | مزامنة Rect مع float
```

#### نقاط التنفيذ:
- `ship.update()` يُستدعى قبل `update_screen()` في كل إطار

---

#### ⚙️ الخطوات / الخوارزمية: إطلاق الطلقات

> دورة حياة الطلقة من الإنشاء حتى الحذف.

```algorithm
1 | K_SPACE pressed | game_functions.py | كشف ضغط المسافة
2 | len(bullets) < bullets_allowed | game_functions.py | التحقق من الحد
3 | Bullet(ai_settings, screen, ship) | bullet.py | إنشاء طلقة عند قمة السفينة
4 | bullets.add(new_bullet) | alien_invasion.py | إضافة للمجموعة
5 | bullets.update() | alien_invasion.py | تحريك كل الطلقات للأعلى كل إطار
6 | bullet.draw_bullet() | game_functions.py | رسم كل طلقة
7 | if bullet.rect.bottom <= 0 | alien_invasion.py | التحقق من الخروج
8 | bullets.remove(bullet) | alien_invasion.py | حذف الطلقة من المجموعة
```

#### نقاط التنفيذ:
- استخدم `bullets.copy()` في الخطوة 7 وليس `bullets` مباشرة
- الحذف في الخطوة 8 يمنع تراكم الطلقات وبطء اللعبة

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| الراية للحركة المستمرة | `flag=False` → `KEYDOWN: flag=True` → `KEYUP: flag=False` → `if flag: move` | أي جسم يتحرك باستمرار |
| `float` للحركة الدقيقة | `self.center = float(rect.centerx)` → `center += speed` → `rect.centerx = center` | عند استخدام سرعة عشرية |
| إنشاء وإضافة `Sprite` | `obj = MySprite(...)` → `group.add(obj)` | عند إنشاء طلقة أو فضائي |
| حذف `Sprite` منتهي | `for item in group.copy(): if condition: group.remove(item)` | حذف ما خرج من الشاشة |
| تفويض الدوال | `def check_events(): ... check_keydown_events() ... check_keyup_events()` | تقسيم الكود لأجزاء صغيرة |

---

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| مستخدم يضغط مفتاحاً باستمرار | راية `bool` + `update()` في كل إطار | `KEYDOWN` يُطلق مرة واحدة |
| سرعة عشرية مثل `1.5` | `self.center` (`float`) + مزامنة مع `rect` | `Rect` يُقرّب إلى أعداد صحيحة |
| حذف عناصر أثناء التكرار | `group.copy()` | تعديل المجموعة أثناء التكرار يُسبب خطأ |
| عدة ملفات تتشارك البيانات | تمرير المعاملات أو استخدام `Settings` | تجنّب المتغيرات العالمية |
| طلقات غير محدودة | `if len(bullets) < allowed` | تحكّم في الصعوبة وتوفير الموارد |

---

### الأفكار الرئيسية الشاملة

**فصل المخاوف (Separation of Concerns):** كل ملف مسؤول عن شيء واحد — هذا المبدأ يجعل المشروع قابلاً للتوسّع. عند إضافة الفضائيين لاحقاً، لا يلزم تغيير `ship.py` أو `bullet.py`.

**حلقة اللعبة (Game Loop):** الحلقة `while True` هي قلب أي لعبة — في كل دورة: معالجة المدخلات → تحديث الحالة → رسم الشاشة. هذا الترتيب ثابت.

**الإحداثيات في pygame:** (0,0) في الزاوية العلوية اليسرى. x يزيد يميناً، y يزيد نحو الأسفل. لذا الأجسام التي تتحرك للأعلى تطرح من y.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. التوزيع: مقارنات 20% / سيناريو كود 35% / تطبيق 30% / تتبع خوارزمية 15%.

---

### السؤال 1 (متوسط)
ما الغرض من استدعاء `pygame.display.flip()` في نهاية كل إطار؟

أ) مسح الشاشة من الرسومات القديمة
ب) عرض محتوى الإطار المرسوم على الشاشة الحقيقية
ج) تهيئة جميع وحدات `pygame`
د) إنشاء نافذة جديدة

**الإجابة الصحيحة: ب**
**التعليل:** `flip()` تُبدّل مخزن الرسم مع ما يُعرض (`double buffering`) — هذا يمنع الوميض. أ) خاطئ — المسح يتم بـ `fill()`. ج) خاطئ — التهيئة بـ `pygame.init()`. د) خاطئ — النافذة تُنشأ بـ `set_mode()`.

---

### السؤال 2 (متوسط)
أي من التالي صحيح بخصوص ترتيب عمليات الرسم داخل حلقة اللعبة؟

أ) `flip()` → `fill()` → `blitme()`
ب) `blitme()` → `fill()` → `flip()`
ج) `fill()` → `blitme()` → `flip()`
د) `fill()` → `flip()` → `blitme()`

**الإجابة الصحيحة: ج**
**التعليل:** `fill()` تمسح الشاشة أولاً → `blitme()` ترسم العناصر → `flip()` تعرض النتيجة. أي ترتيب آخر يُسبب: تغطية العناصر بالخلفية (ب)، أو عرض الشاشة فارغة (أ، د).

---

### السؤال 3 (صعب)
لماذا يستخدم الكود `self.center = float(self.rect.centerx)` بدلاً من تحديث `rect.centerx` مباشرة؟

أ) لأن `pygame.Rect` لا تدعم الحركة
ب) لأن `Rect` يُقرّب العدد العشري لعدد صحيح، مما يُفقد الدقة عند السرعات العشرية مثل `1.5`
ج) لأن `float` يجعل الكود أسرع
د) لأن `self.center` يُستخدم للكشف عن التصادم

**الإجابة الصحيحة: ب**
**التعليل:** إضافة `1.5` لعدد صحيح تُعطي نفس النتيجة أحياناً (`1` بدل `1.5`) بسبب التقريب. باستخدام `float` نحافظ على الدقة الحقيقية. أ) خاطئ — `Rect` تدعم التحريك لكن بأعداد صحيحة. ج) خاطئ — لا علاقة بالسرعة. د) خاطئ — التصادم يستخدم `rect`.

---

### السؤال 4 (متوسط)
ما الفرق بين `pygame.KEYDOWN` و`pygame.KEYUP`؟

أ) `KEYDOWN` للفأرة، `KEYUP` للوحة المفاتيح
ب) `KEYDOWN` يُطلق عند الضغط، `KEYUP` عند الرفع
ج) `KEYDOWN` يُطلق بشكل مستمر، `KEYUP` مرة واحدة
د) لا فرق بينهما في `pygame`

**الإجابة الصحيحة: ب**
**التعليل:** `KEYDOWN` يُطلق لحظة ضغط المفتاح، `KEYUP` لحظة رفعه. نحتاج كليهما لنظام الرايات: `KEYDOWN` يُعيّن `True`، `KEYUP` يُعيّن `False`. أ) كلاهما للوحة المفاتيح. ج) خاطئ — كلاهما لحظي.

---

### السؤال 5 (صعب)
لماذا نستخدم `bullets.copy()` بدلاً من `bullets` مباشرة عند حذف الطلقات؟

أ) لأن `copy()` أسرع
ب) لأن تعديل مجموعة أثناء التكرار عليها مباشرة يُسبب `RuntimeError`
ج) لأن `copy()` تُعيد قائمة منتظمة
د) لأن `bullets` مقفلة بعد `update()`

**الإجابة الصحيحة: ب**
**التعليل:** في بايثون، لا يُسمح بتعديل حجم مجموعة (أو أي iterable) أثناء التكرار عليها — ينتج عنه `RuntimeError: dictionary changed size during iteration`. `copy()` تُعطينا نسخة للتكرار بينما نُعدّل الأصلية. أ) ليس السبب. ج) تُعيد `Group` لا `list`. د) خاطئ.

---

### السؤال 6 (متوسط)
ما الهدف من `bullets_allowed = 3` في `Settings`؟

أ) تحديد حجم كل طلقة
ب) تقييد عدد الطلقات المرئية على الشاشة في لحظة واحدة
ج) تحديد سرعة الطلقات
د) تحديد عدد المرات التي يمكن للاعب الإطلاق يومياً

**الإجابة الصحيحة: ب**
**التعليل:** `if len(bullets) < ai_settings.bullets_allowed` — اللعبة لا تُنشئ طلقة جديدة إذا كان عدد الطلقات الحالية على الشاشة قد وصل للحد. هذا يُضيف تحدياً: اللاعب يجب أن ينتظر حتى تُحذف طلقة قبل إطلاق أخرى. أ) الحجم في `bullet_width/height`. ج) السرعة في `bullet_speed_factor`.

---

### السؤال 7 (صعب)
ما الذي يُعيده `screen.get_rect()`؟

أ) صورة الشاشة كـ `Surface`
ب) `pygame.Rect` بأبعاد الشاشة موضوعاً في (0, 0)
ج) مؤشر الفأرة على الشاشة
د) قائمة بكل الكائنات على الشاشة

**الإجابة الصحيحة: ب**
**التعليل:** `get_rect()` تُعيد `Rect` بأبعاد السطح (width, height) بنقطة أصل (0, 0). نستخدمها لمعرفة حدود الشاشة ووضع السفينة في القاع: `self.rect.bottom = self.screen_rect.bottom`. أ) الشاشة هي `Surface` لكن `get_rect()` تُعيد `Rect` لا `Surface`. ج) الفأرة بـ `pygame.mouse.get_pos()`. د) خاطئ.

---

### السؤال 8 (متوسط)
لماذا ترث فئة `Bullet` من `Sprite` بدلاً من أن تكون فئة عادية؟

أ) لأن `Sprite` أسرع في الرسم
ب) للاستفادة من `Group` — الذي يُتيح `update()` لكل العناصر دفعة واحدة وكشف التصادم
ج) لأن `pygame` لا تدعم الفئات العادية
د) لأن `Sprite` يحمل اللون تلقائياً

**الإجابة الصحيحة: ب**
**التعليل:** `Sprite` + `Group` يُوفران بنية تحتية قوية: `group.update()` تستدعي `update()` لكل عضو، و`groupcollide()` تكشف التصادمات بين مجموعتين. هذا يُبسّط إدارة الفضائيين والطلقات لاحقاً. أ) الرسم نفسه. ج) `pygame` تدعم الفئات العادية. د) خاطئ.

---

### السؤال 9 (صعب)
ما السبب في أن تحريك الطلقة للأعلى يستلزم `self.y -= self.speed_factor` (طرح) وليس جمع؟

أ) لأن الطلقة تُطلق من الأسفل
ب) لأن `pygame` يستخدم نظام إحداثيات حيث y=0 في الأعلى — لذا التحرك للأعلى يعني تقليل y
ج) لأن السرعة سالبة
د) لأن مجموعة `bullets` تعكس الإشارة

**الإجابة الصحيحة: ب**
**التعليل:** في `pygame` الزاوية العلوية اليسرى هي (0,0) وy تزيد نحو الأسفل. للتحرك للأعلى يجب تقليل y. هذا عكس نظام الإحداثيات الرياضي المعتاد. أ) جزئياً صحيح لكن ليس السبب المنطقي للعملية. ج) السرعة موجبة دائماً. د) خاطئ.

---

### السؤال 10 (متوسط)
في أي ملف يجب وضع السفينة `Ship(ai_settings, screen)` لكي تُنشأ مرة واحدة فقط؟

أ) داخل الحلقة `while True`
ب) خارج الحلقة `while True` لكن داخل `run_game()`
ج) في `settings.py`
د) في بداية `game_functions.py`

**الإجابة الصحيحة: ب**
**التعليل:** كائنات تُنشأ مرة واحدة وتُعاد استخدامها = خارج الحلقة. لو وضعناها داخل `while True` ستُعاد تهيئتها في كل إطار (60 مرة/ثانية) مما يُعيد السفينة لمركزها في كل إطار. ج) `settings.py` لا يحتوي كائنات اللعبة. د) `game_functions.py` لا يُنشئ الكائنات الأساسية.

---

### السؤال 11 (صعب)
ما الذي يُفعله `super(Bullet, self).__init__()` في فئة `Bullet`؟

أ) ينشئ طلقة جديدة
ب) يستدعي منشئ فئة `Sprite` الأب لإعداد البنية التحتية للـ `Sprite`
ج) يستدعي منشئ `Bullet` مجدداً
د) يُهيّئ `pygame`

**الإجابة الصحيحة: ب**
**التعليل:** `super()` تُستخدم في OOP لاستدعاء منشئ الفئة الأم. هنا `Sprite.__init__()` يُسجّل الكائن في نظام `pygame.sprite` ويُمكّنه من الانضمام لـ `Group`. بدونه لن يعمل `bullets.add()` بشكل صحيح. أ) الإنشاء بـ `Bullet()`. ج) استدعاء نفسه سيُسبب `RecursionError`. د) التهيئة بـ `pygame.init()`.

---

### السؤال 12 (متوسط)
ما الناتج التقريبي لتشغيل اللعبة مع `ship_speed_factor = 1.5` مقارنة بـ `ship_speed_factor = 1`؟

أ) السفينة تتحرك أبطأ
ب) السفينة تتحرك أسرع بنسبة 50%
ج) السفينة لا تتحرك
د) الحلقة الرئيسية تُنفَّذ أسرع

**الإجابة الصحيحة: ب**
**التعليل:** في كل إطار تتحرك السفينة بمقدار `speed_factor` بكسل. `1.5` بدلاً من `1` يعني 50% حركة إضافية في كل إطار. أ) عكس الصحيح. ج) `1.5` قيمة صالحة. د) السرعة تؤثر على الحركة لا تردد الحلقة.

---

### السؤال 13 (صعب)
في الكود التالي، ما الخطأ؟
```python
while True:
    gf.update_screen(ai_settings, screen, ship, bullets)
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
```

أ) `update_screen` يجب أن يُستدعى قبل `check_events`
ب) `update_screen` يجب أن يكون آخر شيء — الترتيب الصحيح: أحداث → تحديث → رسم
ج) `bullets.update()` يجب أن يكون قبل `ship.update()`
د) لا خطأ في الكود

**الإجابة الصحيحة: ب**
**التعليل:** `update_screen` يجب أن يأتي بعد تحديث كل الكائنات، لأنه يرسم الحالة الحالية. لو رُسم أولاً ستظهر الأوضاع القديمة لا الجديدة. الترتيب الصحيح: `check_events` → `ship.update()` → `bullets.update()` → `update_screen`. ج) ترتيب `ship` و`bullets` لا يؤثر في هذه الحالة. د) يوجد خطأ.

---

### السؤال 14 (متوسط)
ما الذي يُوفّره استخدام `class Settings` بدلاً من وضع القيم مباشرة في الكود؟

أ) يجعل البرنامج أسرع
ب) يُمركز كل القيم القابلة للتعديل في مكان واحد (مبدأ DRY)
ج) يُخفي الكود عن المستخدمين
د) يقلل من حجم الملف

**الإجابة الصحيحة: ب**
**التعليل:** `DRY = Don't Repeat Yourself`. تغيير حجم الشاشة من `800x600` لـ `1024x768` يتم في ملف واحد فقط ويسري على كل الكود. أ) لا تأثير على الأداء. ج) الكود مفتوح. د) قد يزيد الحجم قليلاً لكن الفائدة أكبر.

---

### السؤال 15 (صعب)
ما الذي يُعيده `pygame.event.get()` إذا لم يضغط المستخدم أي شيء؟

أ) يُسبب `ValueError`
ب) يُعيد قائمة فارغة `[]`
ج) يُعيد `None`
د) يتوقف البرنامج

**الإجابة الصحيحة: ب**
**التعليل:** `pygame.event.get()` دائماً تُعيد قائمة — فارغة إذا لم توجد أحداث. الحلقة `for event in []:` لا تُنفَّذ ببساطة. أ) لا توجد استثناءات. ج) دائماً قائمة. د) الحلقة الرئيسية تستمر.

---

### السؤال 16 (صعب)
السيناريو: اللاعب يضغط السهم الأيمن ثم بينما لا يزال مضغوطاً يضغط السهم الأيسر أيضاً. ماذا يحدث للسفينة؟

أ) تتحرك يميناً فقط (آخر ضغطة تربح)
ب) تتوقف لأن الاتجاهين متعاكسان
ج) تستمر في التحرك يميناً لأن `moving_right = True` و`moving_left = True` معاً يتساوى صافيهما صفر
د) تتحرك يميناً ويساراً معاً بسبب `if` مزدوج يُنفّذ كلا الزيادتين — تتوقف فعلياً

**الإجابة الصحيحة: د**
**التعليل:** كلا `moving_right` و`moving_left` يساوي `True`. في `update()` نُنفّذ `if moving_right: center += 1.5` ثم `if moving_left: center -= 1.5` (ليس `elif`!). الصافي = +1.5 - 1.5 = 0 → السفينة ثابتة. هذا سلوك مقصود ومنطقي — الضغط على كلا الاتجاهين يُوقف الحركة.

---

### السيناريو 1: تتبع دورة حياة الطلقة

> اللاعب يضغط `SPACE` وعلى الشاشة حالياً طلقتان. `bullets_allowed = 3`. السفينة في `centerx = 400`, `top = 550`.

#### السؤال 1.1 (صعب)
ماذا يحدث عند ضغط `SPACE`؟

أ) لا يحدث شيء لأن هناك طلقتان بالفعل
ب) تُنشأ طلقة ثالثة عند (400, 550) وتُضاف للمجموعة
ج) تُحذف الطلقتان وتُنشأ واحدة جديدة
د) يتوقف البرنامج

**الإجابة الصحيحة: ب**
**التعليل:** `len(bullets) = 2 < bullets_allowed = 3` → الشرط صحيح → `Bullet(ai_settings, screen, ship)` تُنشأ بـ `centerx = 400`, `top = 550` → `bullets.add()`. لا تُحذف الطلقات القديمة.

#### السؤال 1.2 (متوسط)
بعد 10 إطارات (بافتراض `bullet_speed_factor = 1`)، أين موضع `rect.y` للطلقة الجديدة؟

أ) `540`
ب) `560`
ج) `550 - 10 = 540`
د) `550 + 10 = 560`

**الإجابة الصحيحة: ج**
**التعليل:** الطلقة تبدأ عند `y = 550`. كل إطار: `y -= 1` → بعد 10 إطارات: `y = 550 - 10 = 540`. الحركة للأعلى تعني طرح.

#### السؤال 1.3 (صعب)
متى تُحذف الطلقة من المجموعة؟

أ) عند `rect.y == 0`
ب) عند `rect.bottom <= 0` (الطلقة تجاوزت قمة الشاشة)
ج) بعد 100 إطار
د) عندما تُصيب فضائياً (في هذه المرحلة من المحاضرة)

**الإجابة الصحيحة: ب**
**التعليل:** `if bullet.rect.bottom <= 0: bullets.remove(bullet)`. `rect.bottom = rect.y + rect.height`. إذا كانت `height = 15`، فالحذف يحدث عندما `y <= -15`. في هذه المرحلة لا يوجد كشف تصادم مع الفضائيين بعد.

---

## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، misconception، return_check، dead_code، syntax.

---

### سؤال تصحيح 1

**الكود (يحتوي خطأ — نوع: منطقي):**
```python
while True:
    screen.fill(ai_settings.bg_color)   # clear screen
    ship.blitme()                       # draw ship
    gf.check_events(ship)               # handle events
    ship.update()                       # update position
    pygame.display.flip()               # show frame
```
**اكتشف الخطأ:** `check_events` يُعالج المدخلات بعد الرسم — أي تغيير في الموضع لن يظهر حتى الإطار التالي لكن الأسوأ أن `ship.update()` يأتي بعد الرسم فتُعرض المواضع القديمة دائماً.

**التصحيح:**
```python
while True:
    gf.check_events(ship)               # 1. handle events (update flags)
    ship.update()                       # 2. update position
    screen.fill(ai_settings.bg_color)   # 3. clear screen
    ship.blitme()                       # 4. draw at NEW position
    pygame.display.flip()               # 5. show frame
```
**شرح الحل:**
1. الترتيب الصحيح: مدخلات → منطق → رسم
2. `check_events` يضبط الرايات → `ship.update()` يتحرك → ثم يُرسم في الموضع الجديد
3. `fill()` يجب أن يسبق `blitme()` لمسح الإطار القديم

---

### سؤال تصحيح 2

**الكود (يحتوي خطأ — نوع: misconception حول `bullets.copy()`):**
```python
for bullet in bullets:                  # iterate directly
    if bullet.rect.bottom <= 0:
        bullets.remove(bullet)          # remove while iterating
```
**اكتشف الخطأ:** يُحاول حذف عناصر من `bullets` أثناء التكرار عليها مباشرة — سيُسبب `RuntimeError`.

**التصحيح:**
```python
for bullet in bullets.copy():           # iterate over a copy
    if bullet.rect.bottom <= 0:
        bullets.remove(bullet)          # safe to remove from original
```
**شرح الحل:**
1. `bullets.copy()` تُعيد نسخة للتكرار
2. نُعدّل `bullets` الأصلية أثناء التكرار على النسخة
3. هذا النمط ضروري في كل حالة حذف داخل حلقة

---

### سؤال تصحيح 3

**الكود (يحتوي خطأ — نوع: منطقي في حد الطلقات):**
```python
elif event.key == pygame.K_SPACE:
    new_bullet = Bullet(ai_settings, screen, ship)
    bullets.add(new_bullet)             # always add — no limit check
```
**اكتشف الخطأ:** لا يوجد تحقق من حد `bullets_allowed` — يمكن للاعب إطلاق طلقات لا نهائية.

**التصحيح:**
```python
elif event.key == pygame.K_SPACE:
    if len(bullets) < ai_settings.bullets_allowed:   # check limit first
        new_bullet = Bullet(ai_settings, screen, ship)
        bullets.add(new_bullet)
```
**شرح الحل:**
1. `len(bullets)` يعطي العدد الحالي للطلقات في المجموعة
2. نُقارنه بـ `bullets_allowed` قبل إنشاء طلقة جديدة
3. إذا وصلنا للحد، لا شيء يحدث عند ضغط `SPACE`

---

### سؤال تصحيح 4

**الكود (يحتوي خطأ — نوع: logic في حدود الشاشة):**
```python
def update(self):
    if self.moving_right:
        self.center += self.ai_settings.ship_speed_factor  # no bounds check
    if self.moving_left:
        self.center -= self.ai_settings.ship_speed_factor  # no bounds check
    self.rect.centerx = self.center
```
**اكتشف الخطأ:** لا تحقق من حدود الشاشة — السفينة يمكنها الخروج من الشاشة يميناً ويساراً.

**التصحيح:**
```python
def update(self):
    if self.moving_right and self.rect.right < self.screen_rect.right:
        self.center += self.ai_settings.ship_speed_factor
    if self.moving_left and self.rect.left > 0:
        self.center -= self.ai_settings.ship_speed_factor
    self.rect.centerx = self.center
```
**شرح الحل:**
1. `self.rect.right < self.screen_rect.right` — الحافة اليمنى لم تتجاوز حد الشاشة
2. `self.rect.left > 0` — الحافة اليسرى لم تصل لبداية الشاشة
3. استخدام `and` لدمج شرط الحركة مع شرط الحد

---

### سؤال تصحيح 5

**الكود (يحتوي خطأ — نوع: dead_code / نسيان استدعاء):**
```python
class Ship():
    def __init__(self, ai_settings, screen):
        self.moving_right = False
        self.moving_left = False
        self.center = float(self.rect.centerx)
        self.ai_settings = ai_settings

    def blitme(self):
        self.screen.blit(self.image, self.rect)
    # update() method is missing entirely!

# In alien_invasion.py:
while True:
    gf.check_events(ship)
    # ship.update() is missing!
    gf.update_screen(ai_settings, screen, ship)
```
**اكتشف الخطأ:** دالة `update()` مفقودة من `Ship` ولا يُستدعى `ship.update()` في الحلقة — السفينة لن تتحرك أبداً.

**التصحيح:**
```python
class Ship():
    # ... __init__ ...
    def update(self):
        """Update the ship's position based on movement flags."""
        if self.moving_right and self.rect.right < self.screen_rect.right:
            self.center += self.ai_settings.ship_speed_factor
        if self.moving_left and self.rect.left > 0:
            self.center -= self.ai_settings.ship_speed_factor
        self.rect.centerx = self.center

# In alien_invasion.py:
while True:
    gf.check_events(ship)
    ship.update()          # must call update every frame!
    gf.update_screen(ai_settings, screen, ship)
```
**شرح الحل:**
1. `update()` يجب أن تُعرَّف في فئة `Ship`
2. `ship.update()` يجب أن يُستدعى في كل إطار في الحلقة الرئيسية
3. الرايات وحدها لا تُحرّك السفينة — `update()` هي التي تُطبّق الحركة

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

---

### تمرين 1 (تمرين إضافي): تغيير لون الطلقة — fill_gaps

**السيناريو / المطلوب:**
أكمل الكود التالي ليجعل الطلقات حمراء بدلاً من الرمادي الداكن:

```python
# In settings.py
self.bullet_color = _______    # (1) — fill the correct RGB value for red
```

**المطلوب:**
1. اكتب قيمة `RGB` للأحمر الخالص

**نموذج الحل:**
```python
self.bullet_color = (255, 0, 0)   # pure red: R=255, G=0, B=0
```
**الشرح:** `RGB = (255, 0, 0)` — الأحمر الكامل بلا أخضر أو أزرق.

---

### تمرين 2 (تمرين إضافي): إضافة مفتاح الخروج — code_fix

**السيناريو / المطلوب:**
اللاعب يريد الخروج من اللعبة بضغط `Q`. أضف هذه الميزة:

**المطلوب:**
1. عدّل `check_keydown_events()` لإضافة خروج بـ `Q`

**نموذج الحل:**
```python
def check_keydown_events(event, ai_settings, screen, ship, bullets):
    """Respond to keypresses."""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True
    elif event.key == pygame.K_SPACE:
        fire_bullet(ai_settings, screen, ship, bullets)
    elif event.key == pygame.K_q:    # Q key exits game
        sys.exit()
```

---

### تمرين 3 (تمرين إضافي): تغيير موضع البداية — scenario

**السيناريو / المطلوب:**
عدّل `Ship.__init__()` لتبدأ السفينة في الزاوية اليسرى السفلى بدلاً من المنتصف.

**المطلوب:**
1. عدّل سطر `centerx` ليجعل السفينة في أقصى اليسار

**نموذج الحل:**
```python
# Instead of:
self.rect.centerx = self.screen_rect.centerx   # center

# Use:
self.rect.left = self.screen_rect.left          # left edge (x=0)
self.center = float(self.rect.centerx)          # update center float
```

---

### تمرين 4 (تمرين إضافي): طلقات أسرع — fill_gaps

**السيناريو / المطلوب:**
اجعل الطلقات تتحرك بسرعة 3 بكسل في كل إطار بدلاً من 1.

**المطلوب:**
1. اكتب السطر الصحيح في `settings.py`

**نموذج الحل:**
```python
self.bullet_speed_factor = 3    # 3 pixels per frame upward
```

---

### تمرين 5 (تمرين إضافي): منع الإطلاق أثناء التحرك — scenario

**السيناريو / المطلوب:**
المطلوب منع اللاعب من إطلاق الطلقات أثناء تحرّك السفينة (لزيادة الصعوبة).

**المطلوب:**
1. عدّل `fire_bullet()` لإضافة هذا الشرط

**نموذج الحل:**
```python
def fire_bullet(ai_settings, screen, ship, bullets):
    """Fire a bullet if limit not reached and ship is not moving."""
    # Prevent firing while moving
    if ship.moving_right or ship.moving_left:
        return                         # do not fire if moving
    if len(bullets) < ai_settings.bullets_allowed:
        new_bullet = Bullet(ai_settings, screen, ship)
        bullets.add(new_bullet)
```

---

### تمرين 6 (تمرين إضافي): عرض عدد الطلقات — code_fix

**السيناريو / المطلوب:**
الكود التالي يجب أن يطبع عدد الطلقات على الشاشة لكنه يطبع كلمة خاطئة:

```python
print(bullets)     # prints Group object representation — wrong!
```

**المطلوب:**
1. صحّح السطر ليطبع العدد الصحيح

**نموذج الحل:**
```python
print(len(bullets))    # prints integer count of bullets in group
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

---

### تمرين 1: تحليل بنية الملفات

**السيناريو:**
مطور أراد إضافة نوع جديد من الأسلحة للعبة (صاروخ بدلاً من رصاصة). عنده 5 ملفات: `alien_invasion.py`, `settings.py`, `game_functions.py`, `ship.py`, `bullet.py`.

**المطلوب:**
1. أي الملفات يجب تعديلها؟
2. أي الملفات لا تحتاج تعديل؟

**نموذج الحل:**

| الملف | يُعدَّل؟ | السبب |
| --- | --- | --- |
| `settings.py` | ✅ | إضافة إعدادات الصاروخ (حجم، سرعة، تأثير) |
| `game_functions.py` | ✅ | إضافة دالة `fire_missile()` ومعالجة مفتاح جديد |
| `alien_invasion.py` | ✅ | إضافة `missiles = Group()` وتحديث الحلقة |
| `bullet.py` | ✅ أو ❌ | يمكن إنشاء `missile.py` منفصل أو توسيع `Bullet` |
| `ship.py` | ❌ | السفينة لا تتغير — فقط ما تُطلقه يتغير |

---

### تمرين 2: تحليل نظام الرايات

**السيناريو:**
طالب نفّذ نظام حركة لكنه استخدم `elif` بدلاً من `if` في `update()`:
```python
def update(self):
    if self.moving_right:
        self.center += 1.5
    elif self.moving_left:       # using elif
        self.center -= 1.5
```

**المطلوب:**
1. ما الفرق بين `if/if` و`if/elif` هنا؟
2. أيهما أفضل ولماذا؟

**نموذج الحل:**
- `if/if`: كلا الشرطين يُفحصان — إذا ضُغط كلا المفتاحين في نفس اللحظة: `+1.5 - 1.5 = 0` → السفينة ثابتة (سلوك مقبول)
- `if/elif`: إذا ضُغط كلاهما، فقط `moving_right` يُنفَّذ → السفينة تتحرك دائماً يميناً (تحيّز)
- **المحاضرة تستخدم `if/if`** — أكثر عدالة وأكثر توافقاً مع توقع اللاعب

---

### تمرين 3: تصميم قرار السرعة

**السيناريو:**
اللعبة تريد أن تكون السفينة أسرع كلما طال الوقت (كل 30 ثانية تزيد السرعة).

**المطلوب:**
1. أي ملف يحتوي `ship_speed_factor`؟
2. كيف تُعدّله بمرور الوقت؟

**نموذج الحل:**
```python
# In settings.py
self.ship_speed_factor = 1.5
self.speedup_scale = 1.1    # increase by 10% each level

# In game_functions.py (new function)
def increase_speed(ai_settings):
    """Speed up ship when player advances."""
    ai_settings.ship_speed_factor *= ai_settings.speedup_scale
```

---

### تمرين 4: تحليل إحداثيات pygame

**السيناريو:**
شاشة `800x600`. سفينة عرضها `50` بكسل في المنتصف. طلقة عرضها `3` وارتفاعها `15`.

**المطلوب:**
1. ما إحداثي `rect.centerx` للسفينة؟
2. ما إحداثي `rect.bottom` للسفينة؟
3. عند إطلاق الطلقة، ما `rect.centerx` و`rect.top` للطلقة؟

**نموذج الحل:**
1. `rect.centerx = 800/2 = 400`
2. `rect.bottom = 600` (قاع الشاشة)
3. `bullet.rect.centerx = 400` (مركز السفينة), `bullet.rect.top = ship.rect.top` (أعلى السفينة)

---

## الجزء الرابع: تمارين تتبع التنفيذ

> هذه تمارين إضافية من إعداد الدليل لاختبار الفهم العميق بتتبع التنفيذ خطوة بخطوة.

---

### تمرين تتبع 1: تتبع حركة السفينة

**المدخل:**
```python
# Initial state:
ship.center = 400.0
ship.moving_right = False
ship.moving_left = False
ship_speed_factor = 1.5
screen_width = 800  # screen_rect.right = 800
```
الأحداث (بالترتيب): ضغط K_RIGHT → إطار 1 → إطار 2 → رفع K_RIGHT → إطار 3

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الحدث | moving_right | moving_left | center بعد update() |
| --- | --- | --- | --- |
| ابتداء | False | False | ؟ |
| K_RIGHT ضغط | ؟ | False | (لم يُستدعَ update بعد) |
| إطار 1: update() | True | False | ؟ |
| إطار 2: update() | True | False | ؟ |
| K_RIGHT رُفع | ؟ | False | (لم يُستدعَ update بعد) |
| إطار 3: update() | False | False | ؟ |

**نموذج الحل:**

| الحدث | moving_right | moving_left | center بعد update() |
| --- | --- | --- | --- |
| ابتداء | False | False | 400.0 |
| K_RIGHT ضغط | True | False | — |
| إطار 1: update() | True | False | 401.5 |
| إطار 2: update() | True | False | 403.0 |
| K_RIGHT رُفع | False | False | — |
| إطار 3: update() | False | False | 403.0 (لا تغيير) |

**النتيجة:** السفينة تحركت من `400.0` إلى `403.0` ثم توقفت.

**سؤال MCQ على هذا التتبع:**
ما قيمة `ship.center` بعد 5 إطارات متتالية مع `moving_right = True` و`speed = 1.5`؟

أ) `405.0`
ب) `407.5`
ج) `410.0`
د) `400.5`

**الإجابة: ب** → `400 + (5 × 1.5) = 407.5`

---

### تمرين تتبع 2: تتبع دورة حياة الطلقات

**المدخل:**
```python
bullets = Group()      # empty
bullets_allowed = 3
bullet_height = 15
screen_height = 600    # screen top = y=0
bullet starts at y = 550
bullet_speed_factor = 1
```
الأحداث: ضغط K_SPACE مرتين → 560 إطار (بدون أي ضغط)

**تتبّع خطوة بخطوة (أكمل الجدول):**

| اللحظة | عدد الطلقات | y للطلقة 1 | y للطلقة 2 | تحذير |
| --- | --- | --- | --- | --- |
| البداية | 0 | — | — | — |
| K_SPACE (أول مرة) | ؟ | ؟ | — | — |
| K_SPACE (ثاني مرة) | ؟ | ؟ | ؟ | — |
| بعد 10 إطارات | ؟ | ؟ | ؟ | — |
| بعد 560 إطار | ؟ | ؟ | ؟ | ؟ |
| بعد 565 إطار | ؟ | ؟ | ؟ | ؟ |

**نموذج الحل:**

| اللحظة | عدد الطلقات | y للطلقة 1 | y للطلقة 2 | ملاحظة |
| --- | --- | --- | --- | --- |
| البداية | 0 | — | — | — |
| K_SPACE (1) | 1 | 550 | — | أُنشئت طلقة 1 |
| K_SPACE (2) | 2 | 550 | 550 | أُنشئت طلقة 2 في نفس اللحظة |
| بعد 10 إطارات | 2 | 540 | 540 | تحركتا للأعلى 10 بكسل |
| بعد 560 إطار | 2 | -10 | -10 | `rect.bottom = y + 15 = 5` > 0 بعد |
| بعد 565 إطار | 0 | — | — | حُذفتا عندما `rect.bottom <= 0` |

**النتيجة:** الطلقتان تُحذفان عندما `y = -15` (بعد `550 + 15 = 565` إطار من البداية).

---

### تمرين تتبع 3: تتبع check_events

**المدخل:**
```python
# Initial state:
ship.moving_right = False
ship.moving_left = False
len(bullets) = 2
bullets_allowed = 3
```
تسلسل الأحداث: `KEYDOWN K_LEFT` → `KEYDOWN K_SPACE` → `KEYUP K_LEFT` → `KEYDOWN K_SPACE`

**تتبّع (أكمل الجدول):**

| الحدث | moving_right | moving_left | len(bullets) |
| --- | --- | --- | --- |
| البداية | False | False | 2 |
| KEYDOWN K_LEFT | ؟ | ؟ | ؟ |
| KEYDOWN K_SPACE | ؟ | ؟ | ؟ |
| KEYUP K_LEFT | ؟ | ؟ | ؟ |
| KEYDOWN K_SPACE | ؟ | ؟ | ؟ |

**نموذج الحل:**

| الحدث | moving_right | moving_left | len(bullets) |
| --- | --- | --- | --- |
| البداية | False | False | 2 |
| KEYDOWN K_LEFT | False | True | 2 |
| KEYDOWN K_SPACE | False | True | 3 (طلقة جديدة) |
| KEYUP K_LEFT | False | False | 3 |
| KEYDOWN K_SPACE | False | False | 3 (لا يزيد — الحد) |

**النتيجة:** بعد الضغطة الأخيرة لـ SPACE لا تُضاف طلقة لأن `len(bullets) = 3 = bullets_allowed` — الشرط `< 3` فاشل.

---

## الجزء الرابع: أسئلة تصميم

---

### سؤال تصميم 1: مخطط بنية ملفات المشروع

**المطلوب:**
ارسم مخططاً (class diagram) يُبيّن العلاقات بين ملفات المشروع: `alien_invasion.py`, `Settings`, `Ship`, `Bullet`, `game_functions`.

**نموذج الإجابة:**

#### 📊 المخطط: بنية مشروع Alien Invasion

#### ما هذا المخطط؟
> يوضّح تبعيات واستيرادات بين وحدات المشروع الخمس.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | alien_invasion | process | نقطة البداية — الحلقة الرئيسية |
| 2 | Settings | process | فئة الإعدادات |
| 3 | Ship | process | فئة السفينة |
| 4 | Bullet | process | فئة الطلقة — ترث Sprite |
| 5 | game_functions | process | وحدة الدوال المساعدة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| alien_invasion | Settings | import | → | يستورد Settings |
| alien_invasion | Ship | import | → | يستورد Ship |
| alien_invasion | game_functions | import as gf | → | يستورد gf |
| game_functions | Bullet | import | → | يستورد Bullet لإنشاء الطلقات |
| Ship | Settings | uses | → | يستخدم ai_settings.ship_speed_factor |
| Bullet | Settings | uses | → | يستخدم bullet_speed_factor, bullet_color |

```diagram
type: flowchart
title: Alien Invasion — File Dependencies
direction: TD
nodes:
  - id: main
    label: alien_invasion.py\n(Entry Point)
    kind: event
    level: 0
  - id: settings
    label: Settings\n(settings.py)
    kind: process
    level: 1
  - id: ship
    label: Ship\n(ship.py)
    kind: process
    level: 1
  - id: gf
    label: game_functions\n(game_functions.py)
    kind: process
    level: 1
  - id: bullet
    label: Bullet\n(bullet.py)
    kind: process
    level: 2
edges:
  - from: main
    to: settings
    label: "import Settings"
  - from: main
    to: ship
    label: "import Ship"
  - from: main
    to: gf
    label: "import as gf"
  - from: gf
    to: bullet
    label: "import Bullet"
  - from: ship
    to: settings
    label: "uses ai_settings"
  - from: bullet
    to: settings
    label: "uses bullet settings"
```

**معايير التقييم:**
- تحديد جميع الوحدات الخمس (2 نقطة)
- رسم اتجاه الاستيراد بشكل صحيح (2 نقطة)
- تسمية العلاقات (1 نقطة)

---

### سؤال تصميم 2: تصميم نظام المستويات

**المطلوب:**
صمّم كيف يمكن إضافة نظام مستويات للعبة (كل ما يُباد سرب الفضائيين → مستوى جديد أسرع). أذكر: الملفات المتأثرة، الدوال الجديدة، وكيف تتغير الإعدادات.

**نموذج الإجابة:**

```algorithm
1 | تتبّع level_number | Settings | إضافة self.level = 1
2 | الكشف عن إبادة كل الفضائيين | game_functions | if len(aliens) == 0: next_level()
3 | زيادة السرعات | Settings | alien_speed *= speedup_scale, ship_speed *= 1.1
4 | إنشاء سرب جديد | game_functions | create_fleet(ai_settings, screen, ship, aliens)
5 | تحديث العداد | game_functions | ai_settings.level += 1
6 | عرض المستوى | update_screen | draw level number on screen
```

**الملفات المتأثرة:**
- `settings.py`: إضافة `level`, `speedup_scale`
- `game_functions.py`: إضافة `next_level()`, `create_fleet()`, تعديل `update_screen()`
- `alien_invasion.py`: إضافة `aliens = Group()` وتحديث الحلقة

**معايير التقييم:**
- تحديد الملفات المتأثرة بشكل صحيح (2 نقطة)
- وصف منطق التقدم للمستوى التالي (2 نقطة)
- ذكر آلية زيادة الصعوبة (1 نقطة)

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما وظيفة `pygame.init()`؟
A: تُشغّل جميع وحدات `pygame` الفرعية (صوت، شاشة، حوادث) — يجب استدعاؤها قبل أي شيء آخر.

**Q2:** ما الفرق بين `pygame.KEYDOWN` و`pygame.KEYUP`؟
A: `KEYDOWN` حدث يُطلق لحظة ضغط المفتاح، `KEYUP` لحظة رفعه — كلاهما يحدث مرة واحدة.

**Q3:** لماذا نستخدم `self.center = float(self.rect.centerx)` في `Ship`؟
A: لأن `Rect` يقبل أعداداً صحيحة فقط، وتخزين الموضع كـ `float` يُتيح سرعات عشرية دقيقة مثل `1.5`.

**Q4:** ما وظيفة `screen.fill(bg_color)`؟
A: تطلي الشاشة كاملها بلون واحد — تُستخدم لمسح الإطار السابق في بداية كل دورة.

**Q5:** ما الفرق بين `Sprite` و`Group` في `pygame`؟
A: `Sprite` فئة أساسية للكائنات المتحركة، `Group` وعاء يُجمّع `Sprite` ويُتيح `update()` لكلها دفعة واحدة.

**Q6:** لماذا يتحرك الكائن للأعلى عند طرح من y؟
A: في `pygame` الإحداثي (0,0) في الزاوية العلوية اليسرى وy يزيد نحو الأسفل — لذا طرح من y = تحرك للأعلى.

**Q7:** ما وظيفة `bullets.copy()` عند الحذف؟
A: تُعيد نسخة للتكرار عليها بأمان بينما نُعدّل المجموعة الأصلية — تعديل المجموعة أثناء التكرار المباشر يُسبب `RuntimeError`.

**Q8:** ما الذي يُعيده `image.get_rect()`؟
A: `pygame.Rect` بنفس أبعاد الصورة موضوعاً في (0,0) — يُستخدم لتحديد موضع الصورة على الشاشة.

**Q9:** ما وظيفة `screen.blit(image, rect)`؟
A: ترسم (تلصق) صورة على `Surface` في الموضع المحدد بـ `rect`.

**Q10:** أين يجب وضع `pygame.display.flip()` في الحلقة؟
A: في نهاية كل دورة من `while True:` — بعد جميع عمليات الرسم وقبل بدء الدورة التالية.

**Q11:** ما معنى `bullets_allowed = 3` في `Settings`؟
A: الحد الأقصى للطلقات المسموح بوجودها على الشاشة في آنٍ واحد — إذا وصلنا للحد لا تُطلَق طلقات جديدة.

**Q12:** ما الغرض من تقسيم `check_events()` لـ 3 دوال؟
A: مبدأ `Single Responsibility` — كل دالة مسؤولة عن شيء واحد (`keydown` / `keyup` / توزيع الأحداث) — يُسهّل القراءة والصيانة.

**Q13:** كيف تُحدَّد موضع الطلقة عند إنشائها؟
A: `rect.centerx = ship.rect.centerx` (مركز السفينة أفقياً) و`rect.top = ship.rect.top` (أعلى السفينة عمودياً).

**Q14:** ما الفائدة من `class Settings` بدلاً من الأرقام المباشرة؟
A: تجميع كل القيم القابلة للتعديل في مكان واحد (مبدأ `DRY`) — تغيير أي قيمة يسري على كل الكود تلقائياً.

**Q15:** لماذا تُنشأ السفينة `Ship(ai_settings, screen)` خارج `while True`؟
A: لأنها تُنشأ مرة واحدة وتُعاد استخدامها — وضعها داخل الحلقة يُعيد تهيئتها في كل إطار وكأنها جديدة.

**Q16:** ما الاختلاف في السلوك بين `if/if` و`if/elif` في `update()` للحركة؟
A: `if/if` يُفحص كلا الشرطين — عند ضغط كلا المفتاحين: `+speed - speed = 0` → توقف. `if/elif` يُنفّذ الأول فقط → تحيّز للاتجاه الأول.

**Q17:** ما الذي يُعيده `pygame.event.get()` عند غياب أي حدث؟
A: قائمة فارغة `[]` — الحلقة `for event in []` لا تُنفَّذ ويستمر البرنامج.

**Q18:** كيف تُحدّث `update_screen()` عند إضافة الطلقات؟
A: نضيف `for bullet in bullets.sprites(): bullet.draw_bullet()` بعد `fill()` وقبل `ship.blitme()` لرسم الطلقات خلف السفينة.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

---

### سؤال 1: اشرح مبدأ الحلقة الرئيسية في لعبة `pygame`

**نموذج الإجابة:**
1. **التعريف:** حلقة `while True:` لا تنتهي تُشكّل قلب اللعبة — تُنفَّذ عشرات المرات في الثانية.
2. **المكونات:** ثلاث مراحل في كل دورة: (أ) معالجة المدخلات (`check_events`) → (ب) تحديث الحالة (`ship.update`, `bullets.update`) → (ج) رسم الشاشة (`update_screen`, `flip`)
3. **مثال:** في كل إطار: نفحص هل المستخدم ضغط شيئاً → نُحرّك الكائنات → نرسم كل شيء من جديد
4. **متى نستخدم:** في كل لعبة `pygame` — هذا النمط لا يتغيّر مهما كان حجم اللعبة

---

### سؤال 2: ما الفرق بين `Sprite` و`Group` ولماذا يُستخدمان معاً؟

**نموذج الإجابة:**
1. **التعريف:** `Sprite` = فئة أساسية لكائنات اللعبة القابلة للتحديث والرسم. `Group` = وعاء يُدير مجموعة `Sprite`.
2. **المكونات:** `Group.update()` تستدعي `update()` لكل عضو / `Group.sprites()` تُعيد القائمة / `Group.remove()` للحذف
3. **مثال:** `bullets = Group()` → `bullets.update()` تُحرّك كل الطلقات بسطر واحد
4. **متى نستخدم:** عند وجود عناصر متعددة من نفس النوع (طلقات، فضائيين) — `Group` تُبسّط إدارتها بشكل جذري

---

### سؤال 3: لماذا نفصل الكود إلى ملفات متعددة (`settings.py`, `game_functions.py`, `ship.py`)؟

**نموذج الإجابة:**
1. **التعريف:** مبدأ `Separation of Concerns` — كل ملف/وحدة مسؤول عن جانب واحد من النظام
2. **المكونات:** `settings.py` = إعدادات فقط / `ship.py` = سلوك السفينة فقط / `game_functions.py` = منطق اللعبة العام
3. **مثال:** لتغيير سرعة السفينة: نُعدّل سطراً واحداً في `settings.py` — لا نبحث في كل الكود
4. **متى نستخدم:** في أي مشروع أكبر من 50 سطر — الملف الواحد يصعب قراءته وصيانته

---

### سؤال 4: اشرح نظام الرايات (`flags`) للتحكم في حركة السفينة

**نموذج الإجابة:**
1. **التعريف:** `bool` يُمثّل حالة الحركة — `True` = متحرك، `False` = ثابت
2. **المكونات:** (أ) تعريف الراية في `__init__` → (ب) `KEYDOWN` يرفعها `True` → (ج) `KEYUP` يخفضها `False` → (د) `update()` يتحرك إذا كانت `True`
3. **مثال:** `moving_right` و`moving_left` — السفينة تتحرك ما دام المفتاح مضغوطاً
4. **متى نستخدم:** كلما أردت حركة مستمرة — `KEYDOWN` وحده يُطلق مرة واحدة فقط

---

### سؤال 5: ما إحداثيات `pygame` وكيف تختلف عن الإحداثيات الرياضية؟

**نموذج الإجابة:**
1. **التعريف:** (0,0) في الزاوية العلوية اليسرى، x يزيد يميناً، y يزيد نحو الأسفل
2. **المكونات:** `rect.top` = أعلى / `rect.bottom` = أسفل / `rect.left` = يسار / `rect.right` = يمين / `rect.centerx` / `rect.centery`
3. **مثال:** للتحرك للأعلى: `y -= speed` (طرح) — عكس الإحداثيات الرياضية التي تُضيف للأعلى
4. **متى نستخدم:** في كل عملية تموضع ورسم وكشف تصادم في `pygame`

---

### سؤال 6: ما هو `double buffering` ولماذا يستخدمه `pygame.display.flip()`؟

**نموذج الإجابة:**
1. **التعريف:** تقنية استخدام مخزنين: نرسم في المخزن الخلفي بينما يُعرض المخزن الأمامي
2. **المكونات:** `screen.fill()` و`blit()` تُعدّلان المخزن الخلفي — `flip()` تُبدّلهما
3. **مثال:** بدون `flip()` قد يرى المستخدم الشاشة في حالات رسم وسيطة → وميض مزعج
4. **متى نستخدم:** `flip()` في نهاية كل إطار — ضروري في كل لعبة `pygame`

---

### سؤال 7: اشرح فئة `Bullet` من حيث الإنشاء والتحرك والحذف

**نموذج الإجابة:**
1. **التعريف:** `Bullet(Sprite)` كائن يمثّل طلقة — تُنشأ، تتحرك، تُحذف عند الخروج
2. **المكونات:** `__init__()` يُحدد الموضع → `update()` يُحرّك للأعلى → `draw_bullet()` يرسمها كمستطيل
3. **مثال:** `self.y -= self.speed_factor` → `self.rect.y = self.y` في كل إطار
4. **متى نُحذف:** `if bullet.rect.bottom <= 0: bullets.remove(bullet)`

---

### سؤال 8: لماذا نستخدم `pygame.draw.rect()` للطلقات بدلاً من صورة `image.load()`؟

**نموذج الإجابة:**
1. **التعريف:** `pygame.draw.rect()` يرسم مستطيلاً ملوناً — أبسط وأسرع من تحميل صورة لكائن صغير
2. **المكونات:** `pygame.draw.rect(surface, color, rect)` — السطح، اللون كـ `RGB`، المستطيل
3. **مثال:** طلقة 3×15 بكسل رمادية — لا تستحق ملف صورة منفصل
4. **متى نستخدم:** للأشكال البسيطة (مستطيلات، دوائر) — `image.load()` للأشكال المعقدة

---

### سؤال 9: كيف تعمل `Group.update()` وما ميزتها؟

**نموذج الإجابة:**
1. **التعريف:** تستدعي دالة `update()` لكل `Sprite` داخل المجموعة تلقائياً
2. **المكونات:** `bullets.update()` = تُحرّك كل الطلقات دفعة واحدة
3. **مثال:** 10 طلقات على الشاشة → سطر واحد `bullets.update()` يُحرّكها جميعاً
4. **متى نستخدم:** دائماً عند إدارة مجموعات كائنات — بديل أنيق لـ `for bullet in bullets: bullet.update()`

---

### سؤال 10: اشرح لماذا يجب استدعاء `screen.fill()` في بداية كل إطار

**نموذج الإجابة:**
1. **التعريف:** `fill()` يطلي الشاشة بلون واحد — يمحو كل ما رُسم في الإطار السابق
2. **المكونات:** بدون `fill()`، تتراكم الإطارات: السفينة تترك أثراً في كل مكان تحركت إليه
3. **مثال:** السفينة تبدأ في 400 تتحرك يميناً → بدون `fill()` ترى السفينة في كل المواقع
4. **متى نستخدم:** أول شيء في قسم الرسم — قبل أي `blit()` أو `draw_bullet()`

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أعرف وظيفة كل من: `pygame.init()`, `set_mode()`, `set_caption()`, `flip()`, `fill()`
- [ ] أفهم ترتيب عمليات الرسم: `fill()` → العناصر → `flip()`
- [ ] أعرف الفرق بين `KEYDOWN` و`KEYUP` وكيف يعمل نظام الرايات
- [ ] أفهم لماذا نستخدم `self.center (float)` بدلاً من `rect.centerx` مباشرة
- [ ] أعرف كيف تعمل `Group` و`Sprite` معاً
- [ ] أستطيع شرح دورة حياة الطلقة: إنشاء → تحريك → حذف
- [ ] أعرف لماذا نستخدم `bullets.copy()` عند الحذف
- [ ] أفهم نظام إحداثيات `pygame` (y=0 أعلى، يزيد نحو الأسفل)
- [ ] أعرف وظيفة كل ملف: `alien_invasion.py`, `settings.py`, `game_functions.py`, `ship.py`, `bullet.py`
- [ ] أستطيع شرح فائدة `class Settings` (مبدأ DRY)
- [ ] أعرف الفرق بين `pygame.draw.rect()` و`pygame.image.load()` ومتى أستخدم كلاً منهما
- [ ] أفهم مبدأ `double buffering` ودور `flip()`
- [ ] أستطيع كتابة `check_keydown_events()` و`check_keyup_events()` من الذاكرة
- [ ] أعرف كيف تُقيّد `bullets_allowed` عدد الطلقات

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| 13 (Game Project) | OOP / Classes | `Ship`, `Bullet`, `Settings` كلها فئات |
| 13 (Game Project) | Inheritance | `Bullet` ترث `Sprite` |
| 13 (Game Project) | Python Basics | `while`, `for`, `if`, `elif`, `bool` flags |
| 13 (Game Project) | محاضرات قادمة | إضافة الفضائيين، كشف التصادم، النقاط |

---

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| ترتيب الحلقة | `check_events` → `update` → `fill` → `draw` → `flip` |
| إحداثيات `pygame` | (0,0) أعلى اليسار، y يزيد للأسفل |
| `float` للحركة | `self.center` للحساب، `rect.centerx` للرسم |
| حذف آمن | دائماً `group.copy()` عند الحذف أثناء loop |
| رايات الحركة | `KEYDOWN` → `True`، `KEYUP` → `False`، `update()` يتحرك |

---

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `pygame.QUIT` | إغلاق النافذة | `check_events()` |
| `pygame.KEYDOWN` | ضغط مفتاح | `check_keydown_events()` |
| `pygame.KEYUP` | رفع مفتاح | `check_keyup_events()` |
| `pygame.K_RIGHT` | مفتاح السهم الأيمن | شرط الحركة |
| `pygame.K_LEFT` | مفتاح السهم الأيسر | شرط الحركة |
| `pygame.K_SPACE` | مفتاح المسافة | إطلاق طلقة |
| `pygame.K_q` | مفتاح Q | خروج اختياري |
| `rect.centerx` | إحداثي المركز أفقياً | تموضع وتحريك |
| `rect.bottom` | إحداثي الحافة السفلية | تموضع، كشف الخروج |
| `rect.right` | إحداثي الحافة اليمنى | حدود الشاشة |
| `rect.left` | إحداثي الحافة اليسرى | حدود الشاشة |

---

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | `pygame.init()` → `set_mode()` → الحلقة → `flip()` — هذا الترتيب لا يتغير |
| 2 | `fill()` أولاً في كل إطار — قبل أي رسم |
| 3 | `flip()` آخر شيء في كل إطار — بعد كل الرسم |
| 4 | `float` للحساب، `int (rect)` للرسم — لا تخلطهما |
| 5 | `bullets.copy()` عند الحذف — لا `bullets` مباشرة |
| 6 | `y -= speed` للأعلى، `y += speed` للأسفل — عكس الحدس |
| 7 | فصل الكود: `settings.py` للقيم، `game_functions.py` للمنطق، `ship.py` للسفينة |
| 8 | `ship.update()` في الحلقة — بدونه الرايات لا تُحرّك شيئاً |

---

<!-- VALIDATION
schema: 1.0
parts: integration_map, detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, design_question, qa_cards, theory, self_check, cheat_sheet
mcq_count: 19
code_blocks: 22
-->
