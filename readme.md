# Dixie Backend

## Opis

- Projekt će se praviti u komponentama. Ispod je dokumentacija svake komponente i njenih funkcionalnosti.

## Navbar

- Navbar je jednostavna komponenta koja ima dva stanja.
- Prvo stanje je kada se samo uključuje, tj. kada se doda <Navbar />.
- Ona uvijek mora biti na samom vrhu projekta.
- Kada joj dodamo atribut <Navbar navType="nav-dashboard" />, ona tada zauzima 100% širine stranice i dobija $background boju.

## Sidebar

- Sidebar komponenta ima samo jedno stanje, tj. kada se uključuje.
- Ona mora biti uključena u kontejner zajedno s još jednim elementom koji će imati flex-grow: 1.
- Primjer:

```html
<main>
  <Sidebar>
  <container><h1>Bitno</h1></container>
</main>
```

## Header

- Header komponenta služi samo da promijeni title taba u gornjem lijevom kutu.
- Primjer:

```html
<header title="dashboard" />
```

## LayoutContainer

- LayoutContainer je napravljen da sve ove komponente ujedini u dashboardu, tako da poslije možete samo dodavati stavke.
- Primjer:

```html
<LayoutContainer handleSubmit="{handleSubmit}" headTitle="Neki vas modul">
  <title>Neki vas modul</title>
  <div>
    <p>Item1</p>
    <p>Item2</p>
  </div>
</LayoutContainer>
```

- handleSubmit radi kao forma, umjesto onSubmit atributa dodajete handleSubmit i u njega vašu logiku.
- headTitle vam je isto kao <Header /> komponenta.
- LayoutContainer također sadrži Navbar i Sidebar tako da njih ne morate posebno uključivati.
- Svaki item unutar LayoutContainera će renderirati vaše elemente.
