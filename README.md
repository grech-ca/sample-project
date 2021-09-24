# Digital Skynet Styleguide

## Окружение
  1. Использовать линтеры: ESlint, Stylelint, Prettier
  2. Предотвращать коммит, если один из линтеров выдает ошибку (для этого использовать lint-staged и husky)

## React

### Нейминг

  1. Если компонент создается на основе существующего во внешнем модуле, компонент из внешнего модуля должен иметь отличительный алиас

    #### Хорошо

    ```tsx
      import { DatePicker as ExternalDatepicker } from 'some-datepicker-module;

      const DatePicker = ...;
    ```

    #### Плохо
    ```tsx
      import { DatePicker } from 'some-datepicker-module';

      const FlashDatePicker = ...;
    ```

  3. Компонент должен иметь такое же имя как и файл, содержащий его
  4. Локальный компонент должен импортироваться с тем же именем, с которым он был объявлен
  5. Имена всех компонентов должны быть в PascalCase

### Типизация компонента

  Компонент должен быть функциональным, а также иметь тип FC (сокращение от FunctionComponent), который может принимать тип пропсов, которые будут передаваться в компонент

  ```tsx
    interface SampleComponentProps {
      text: string
    }

    const SampleComponent: FC<SampleComponentProps> = ({ text }) => {
      // логика компонента, если есть

      return (
        <div>{text}</div>
      );
    }

    // или

    const SampleComponent: FC<SampleComponent> = ({ text }) => (
      <div>{text}</div>
    );

    export default SampleComponent;
  ```

### Мемоизация

  Функции и переменные внутри компонента в большинстве случаев должны быть мемоизированы с помощью `useCallback` и `useMemo` соответственно.
  Это необходимо для предотвращения нежелательных ререндеров как отдельных компонентов так и в некоторых случаях всего приложения.
  Исключением могут стать только переменные, значение которых простое для вычисления и от которого не зависит мемоизированная переменная / функция

### Пропсы

  1. При описании параметра, предназначенного для стилей, необходимо использовать `CSSProperties['название параметра']`

    ```ts
    import { CSSProperties } from 'react';

    interface ComponentProps {
      position: CSSProperties['position'];
    }
    ```

  2. Пропсы должны быть интерфейсом, чтобы их можно был расширить без проблем

  3. Название пропсов должно быть таким же, как и название компонента, который их использует + постфикс "Props"

  ```tsx
  interface SampleComponentProps {
    ...
  }

  const SampleComponent: FC<SampleComponentProps> = () => { ... };
  ```

### SVG

  1. Все потенциально стилизуемые SVG-изображения должны импортироваться так, как это предлагает Create React App:
    ```ts
      import { ReactComponent as CameraIcon } from 'assets/icons/camera.svg';
    ```
  2. Если изображение имеет только один цвет и добавлено вручную, а не импортировано из внешнего модуля, то его нужно сделать стилизуемым. Для этого нужно открыть .svg файл в текстовом редакторе и добавить параметр `color="currentColor"` в тег &lt;svg&gt; и заменить все существующие в файле значения цвета (rgb, hex, hsl и тд.) на "currentColor". После этого изображение будет окрашиваться в тот же цвет, что и текст, находящийся в этом элементе.

## JavaScript

1. Использовать краткие условия, где возможно
   
   ```tsx
    if (value > 5) return 'more than five';
    if (value < -4) return 'less than negative four';
    return 'more than negativ four and less than five';

    // вместо

    if (value > 5) {
      return 'more than five';
    } else if (value < -4) {
      return 'less than negative four';
    } else {
      return 'more than negativ four and less than five';
    }
   ```
2. Выводить новое значение, вместо мутирования старого
   ```tsx
   const newElements = elements.map(el => el);

  // вместо

  const newElements = [];

  for (let el of elements) {
    newElements.push(el);
  }
   ```
3. Выносить все условия в читаемые переменные
   ```tsx
    const isSmall = width <= 300;

    if (isSmall && someElseCondition) doSomething();
   ```

4. Не называть элементы массива в цикле абстрактными именами
   ```tsx
    cars.map(car => car);

    // вместо

    cars.map(a => a);
   ```

## Typescript

  1. Все типы, енамы и интерфейсы должны быть написаны в PascalCase
  2. Ключи енамов должны быть написаны в PascalCase
  3. Интерфейсы предпочтительнее для объектов, чем типы
  4. Избегать вложенных объектов в интерфейсе, создавая отдельные интерфейсы для них
  5. Генерировать API типы с помощью одного из существующих решений, вместо переписывания их вручную, например [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api)
## Imports

1. Все импорты должны быть разделены на условные "блоки", между которыми должен быть отступ в одну строку.
2. Импорты должны быть расположены в порядке их важности в проекте
   ```tsx
    import fs from 'fs'; // встроенные модули

    import { FC, useState } from 'react'; // React

    import { useSelector } from 'react-redux'; // внешние хуки
    import { useTheme } from '@material-ui/core';

    import { sortBy } from 'lodash'; // внешние утилиты и инициализаторы
    import moment from 'moment';
    import styled from 'styled-components';
    import i18n from 'i18-next';
    import { ApolloClient } from '@apollo/client';

    import { ThemeProvider } from '@material-ui/core'; // внешние провайдеры
    import { Provider } from 'react-redux';

    import { Button } from '@material-ui/core'; // внешние компоненты
    import ReactSelect from 'react-select';

    import Router, { PublicRouter, PrivateRouter } from 'routers'; // роутеры

    import LoginPage from 'pages/public/LoginPage'; // страницы

    import AuthProvider, { AuthContext } from 'providers/AuthProvider'; // провайдеры и контекст

    import Button from 'components/common/Button'; // компоненты
    import Header from 'components/layout/Header';

    import { useTimeout } from 'hooks/useTimeout'; // хуки

    import calculateTree from 'helpers/calculateTree'; // утилиты, инициализаторы, константы

    import { Optional } from 'types/common'; // типы, интерфейсы, enum
    import { OrderStatus } from 'types/order';

    import fakeOrders from 'data/fakeOrders.json'; // ассеты и статичные данные
    import fakeCars from 'data/fakeCars';
    import { ReactComponent as CameraIcon } from 'assets/icons/camera.svg';
   ```

Если из одного модуля импортируется несколько разных по предназначению элементов, то нужно выбрать только один из тематических блоков и оставить только один импорт

P.S. 70% логики реализовано в `.imports.eslintrc.js`. Конфиг не включает в себя сортировку внешних модулей, так как все специфично для каждого проекта

## styled-components и стили

1. Использовать обычные селекторы только для перезаписи стилей у компонента из внешнего модуля
2. Использовать существующие стилевые компоненты в качестве селектора
```ts
const StyledButton = styled.button({ ... });
const StyledElement = styled.div({
 [StyledButton]: {
   ...
 }
});
```
3. Если нужно стилизовать SVG изображение, необходимо создать `styled.svg` компонент и в jsx передавать иконку в проп `as={IconComponent}`

### Хорошо

#### style/component.ts

```tsx
  const ButtonIcon = styled.svg({
    color: '#f00',
  });
```

#### components/common/Component.tsx

```tsx
  <Button>
    <ButtonIcon as={EyeIcon} />
  </Button>
```

### Плохо

#### style/component.ts

```tsx
  const StyledButton = styled.button({
    svg: {
      marginRight: 30,
    },
  });
```

#### components/common/Component.tsx

```tsx
  <Button>
    <EyeIcon />
  </Button>
```
4. Создавать отдельные переменные для различных цветов и хранить в одном файле
5. borderRadius желательно должен быть кратен 4, чтобы избежать путаницы
6. Не злоупотреблять медиа-запросами и стремиться реализовать адаптивную верстку с помощью flexWrap и других параметров для flex и grid
   
## Folder structure
  
  Файлы должны быть распределены по папкам, имя которых описывает прямое назначение этих файлов

### Пример

  ```yaml
    src:
      components:
        layout:
          - Header.tsx
        common:
          - Button.tsx
          - Input.tsx
        order:
          - OrderStatus.tsx
          - OrderForm.tsx
        SomeLargeComponent:
          - index.tsx
          - LocalComponent.tsx
          - Etc.tsx
      helpers:
        - transformTree.ts
      hooks:
        - useAppDispatch.ts
        - useAppSelector.ts
      pages:
        private:
          - FeedPage.tsx
        public:
          - LoginPage.tsx
      api:
        - blog.ts
      types:
        - enums.ts
      styles:
        - order.ts
        - common.ts
      store:
        - index.ts
        - slices:
          - order.ts
  ```
