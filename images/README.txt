WHAT IS IN HERE
===============

All ten slots are filled. Each photo is named for the slot it sits in,
which is the whole reason the page finds it — see 'How to use one'.

  garden.jpeg      hero, right of the first block. Dusk, lights on.
  tree.jpeg        beside the story section. Table under the canopy.
  canopy.jpeg      gallery. Tables and planting, wide.
  pizza.jpeg       gallery. Paneer pizza on the board.
  coffee.jpeg      gallery. Latte and the cream-topped cold one.
  indoors.jpeg     gallery. The covered side, banquette and lamps.
  music.jpeg       gallery. Evening, bar and the screen.
  entrance.jpeg    gallery. The lit badge sign at night.
  breakfast.jpeg   gallery. Platter with the garden behind it.
  lights.jpeg      gallery. Night, lit planting and fairy lights.

Seven more sit in the gallery only, named for what they are:
evening, bar-evening, garden-day, guests, cappuccino, beans, noodles.

To swap any of them, drop a new file in with the same name. To retire
one, delete it and the slot goes back to a cross-hatch placeholder.

Best time to shoot: about 6:30pm. The light is warm, the lamps are on,
and the garden is not yet full. One trip gets you eight of the ten.


Where to put the raw photos
---------------------------
originals/ is the dump folder. Empty the phone into it, full size, and
pick the keepers out of it later. Nothing in there is used by the site,
so file size does not matter until you export a photo up into this
folder. Leave it out when you upload the site.

How to use one
--------------
Dump the photos into this folder however you like — any names, any
extensions, and subfolders are fine. Then point each slot in
index.html at the file you want in it, by editing its data-src:

    <div data-src="images/garden" ...>
    <div data-src="images/5e90ebb66f3d3f222a15cb14b100a4fb.avif" ...>

The path is relative to index.html, so it always starts with images/.
Subfolders work: images/gallery/DSC_0041.avif. .jpg .jpeg .png .webp
and .avif all work — the extension has to match the real file.

The ten slots are marked in index.html by their data-ph label, which
matches the shot list above. Search index.html for data-src to find
them: two in the page body (garden, tree) and eight in the gallery.

Shortcut, still supported: if you write data-src without any
extension — data-src="images/garden" — the page looks for
garden.jpg, .jpeg, .png, .webp and .avif in turn. So naming a file
for its slot and dropping it in here still works with no editing.

Nothing breaks while a photo is missing. A slot whose file is not
there keeps the cross-hatch placeholder, so you can fill the ten in
one at a time and the site looks finished the whole way through.

Alt text
--------
Handled for you. Each photo takes its description from the label the
placeholder was already showing, which is what a blind visitor hears
and what Google reads. To reword one, edit the data-ph="..." on that
placeholder in index.html.

Size and weight
---------------
Shoot at least 1600px on the long edge. Before uploading, run each photo
through squoosh.app and export as WebP at about 80% quality — a phone photo
straight off the camera is 4-6 MB and will make the site feel slow on
mobile data. Aim for under 300 KB per image.
