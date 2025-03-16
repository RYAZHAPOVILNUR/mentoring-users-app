# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images)

pdfjs-previous-button =
    .title = Pot buk mukato
pdfjs-previous-button-label = Mukato
pdfjs-next-button =
    .title = Pot buk malubo
pdfjs-next-button-label = Malubo
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Pot buk
# Variables:
#   $pagesCount (Number) - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = pi { $pagesCount }
# Variables:
#   $pageNumber (Number) - the currently visible page
#   $pagesCount (Number) - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber } me { $pagesCount })
pdfjs-zoom-out-button =
    .title = Jwik Matidi
pdfjs-zoom-out-button-label = Jwik Matidi
pdfjs-zoom-in-button =
    .title = Kwot Madit
pdfjs-zoom-in-button-label = Kwot Madit
pdfjs-zoom-select =
    .title = Kwoti
pdfjs-presentation-mode-button =
    .title = Lokke i kit me tyer
pdfjs-presentation-mode-button-label = Kit me tyer
pdfjs-open-file-button =
    .title = Yab Pwail
pdfjs-open-file-button-label = Yab
pdfjs-print-button =
    .title = Go
pdfjs-print-button-label = Go

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Gintic
pdfjs-tools-button-label = Gintic
pdfjs-first-page-button =
    .title = Cit i pot buk mukwongo
pdfjs-first-page-button-label = Cit i pot buk mukwongo
pdfjs-last-page-button =
    .title = Cit i pot buk magiko
pdfjs-last-page-button-label = Cit i pot buk magiko
pdfjs-page-rotate-cw-button =
    .title = Wire i tung lacuc
pdfjs-page-rotate-cw-button-label = Wire i tung lacuc
pdfjs-page-rotate-ccw-button =
    .title = Wire i tung lacam
pdfjs-page-rotate-ccw-button-label = Wire i tung lacam
pdfjs-cursor-text-select-tool-button =
    .title = Cak gitic me yero coc
pdfjs-cursor-text-select-tool-button-label = Gitic me yero coc
pdfjs-cursor-hand-tool-button =
    .title = Cak gitic me cing
pdfjs-cursor-hand-tool-button-label = Gitic cing

## Document properties dialog

pdfjs-document-properties-button =
    .title = Jami me gin acoya…
pdfjs-document-properties-button-label = Jami me gin acoya…
pdfjs-document-properties-file-name = Nying pwail:
pdfjs-document-properties-file-size = Dit pa pwail:
# Variables:
#   $size_kb (Number) - the PDF file size in kilobytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb } KB ({ $size_b } bytes)
# Variables:
#   $size_mb (Number) - the PDF file size in megabytes
#   $size_b (Number) - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb } MB ({ $size_b } bytes)
pdfjs-document-properties-title = Wiye:
pdfjs-document-properties-author = Ngat mucoyo:
pdfjs-document-properties-subject = Subjek:
pdfjs-document-properties-keywords = Lok mapire tek:
pdfjs-document-properties-creation-date = Nino dwe me cwec:
pdfjs-document-properties-modification-date = Nino dwe me yub:
# Variables:
#   $date (Date) - the creation/modification date of the PDF file
#   $time (Time) - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date }, { $time }
pdfjs-document-properties-creator = Lacwec:
pdfjs-document-properties-producer = Layub PDF:
pdfjs-document-properties-version = Kit PDF:
pdfjs-document-properties-page-count = Kwan me pot buk:
pdfjs-document-properties-page-size = Dit pa potbuk:
pdfjs-document-properties-page-size-unit-inches = i
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = atir
pdfjs-document-properties-page-size-orientation-landscape = arii
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Waraga
pdfjs-document-properties-page-size-name-legal = Cik

## Variables:
##   $width (Number) - the width of the (current) page
##   $height (Number) - the height of the (current) page
##   $unit (String) - the unit of measurement of the (current) page
##   $name (String) - the name of the (current) page
##   $orientation (String) - the orientation of the (current) page

pdfjs-document-properties-page-size-dimension-string = { $width } × { $height } { $unit } ({ $orientation })
pdfjs-document-properties-page-size-dimension-name-string = { $width } × { $height } { $unit } ({ $name }, { $orientation })

##

pdfjs-document-properties-linearized-yes = Eyo
pdfjs-document-properties-linearized-no = Pe
pdfjs-document-properties-close-button = Lor

## Print

pdfjs-print-progress-message = Yubo coc me agoya…
# Variables:
#   $progress (Number) - percent value
pdfjs-print-progress-percent = { $progress }%
pdfjs-print-progress-close-button = Juki
pdfjs-printing-not-supported = Ciko: Layeny ma pe teno goyo liweng.
pdfjs-printing-not-ready = Ciko: PDF pe ocane weng me agoya.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Lok gintic ma inget
pdfjs-toggle-sidebar-button-label = Lok gintic ma inget
pdfjs-document-outline-button =
    .title = Nyut Wiyewiye me Gin acoya (dii-kiryo me yaro/kano jami weng)
pdfjs-document-outline-button-label = Pek pa gin acoya
pdfjs-attachments-button =
    .title = Nyut twec
pdfjs-attachments-button-label = Twec
pdfjs-thumbs-button =
    .title = Nyut cal
pdfjs-thumbs-button-label = Cal
pdfjs-findbar-button =
    .title = Nong iye gin acoya
pdfjs-findbar-button-label = Nong

## Thumbnails panel item (tooltip and alt text for images)

# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-title =
    .title = Pot buk { $page }
# Variables:
#   $page (Number) - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Cal me pot buk { $page }

## Find panel button title and messages

pdfjs-find-input =
    .title = Nong
    .placeholder = Nong i dokumen…
pdfjs-find-previous-button =
    .title = Nong timme pa lok mukato
pdfjs-find-previous-button-label = Mukato
pdfjs-find-next-button =
    .title = Nong timme pa lok malubo
pdfjs-find-next-button-label = Malubo
pdfjs-find-highlight-checkbox = Ket Lanyut I Weng
pdfjs-find-match-case-checkbox-label = Lok marwate
pdfjs-find-reached-top = Oo iwi gin acoya, omede ki i tere
pdfjs-find-reached-bottom = Oo i agiki me gin acoya, omede ki iwiye
pdfjs-find-not-found = Lok pe ononge

## Predefined zoom values

pdfjs-page-scale-width = Lac me iye pot buk
pdfjs-page-scale-fit = Porre me pot buk
pdfjs-page-scale-auto = Kwot pire kene
pdfjs-page-scale-actual = Dite kikome
# Variables:
#   $scale (Number) - percent value for page scale
pdfjs-page-scale-percent = { $scale }%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Bal otime kun cano PDF.
pdfjs-invalid-file-error = Pwail me PDF ma pe atir onyo obale woko.
pdfjs-missing-file-error = Pwail me PDF tye ka rem.
pdfjs-unexpected-response-error = Lagam mape kigeno pa lapok tic.
pdfjs-rendering-error = Bal otime i kare me nyuto pot buk.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String) - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types).
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type } Lok angea manok]

## Password

pdfjs-password-label = Ket mung me donyo me yabo pwail me PDF man.
pdfjs-password-invalid = Mung me donyo pe atir. Tim ber i tem doki.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Juki
pdfjs-web-fonts-disabled = Kijuko dit pa coc me kakube woko: pe romo tic ki dit pa coc me PDF ma kiketo i kine.

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


pdfjs-save-button =
    .title = Save
pdfjs-save-button-label = Save
pdfjs-download-button =
    .title = Download
pdfjs-download-button-label = Download
pdfjs-bookmark-button =
    .title = Current Page (View URL from Current Page)
pdfjs-bookmark-button-label = Current Page
pdfjs-scroll-page-button =
    .title = Use Page Scrolling
pdfjs-scroll-page-button-label = Page Scrolling
pdfjs-scroll-vertical-button =
    .title = Use Vertical Scrolling
pdfjs-scroll-vertical-button-label = Vertical Scrolling
pdfjs-scroll-horizontal-button =
    .title = Use Horizontal Scrolling
pdfjs-scroll-horizontal-button-label = Horizontal Scrolling
pdfjs-scroll-wrapped-button =
    .title = Use Wrapped Scrolling
pdfjs-scroll-wrapped-button-label = Wrapped Scrolling
pdfjs-spread-none-button =
    .title = Do not join page spreads
pdfjs-spread-none-button-label = No Spreads
pdfjs-spread-odd-button =
    .title = Join page spreads starting with odd-numbered pages
pdfjs-spread-odd-button-label = Odd Spreads
pdfjs-spread-even-button =
    .title = Join page spreads starting with even-numbered pages
pdfjs-spread-even-button-label = Even Spreads
pdfjs-toggle-sidebar-notification-button =
    .title = Toggle Sidebar (document contains outline/attachments/layers)
pdfjs-layers-button =
    .title = Show Layers (double-click to reset all layers to the default state)
pdfjs-layers-button-label = Layers
pdfjs-current-outline-item-button =
    .title = Find Current Outline Item
pdfjs-current-outline-item-button-label = Current Outline Item
pdfjs-additional-layers = Additional Layers
pdfjs-find-match-diacritics-checkbox-label = Match Diacritics
pdfjs-find-entire-word-checkbox-label = Whole Words
pdfjs-find-match-count =
    { $total ->
        [one] { $current } of { $total } match
       *[other] { $current } of { $total } matches
    }
pdfjs-find-match-count-limit =
    { $limit ->
        [one] More than { $limit } match
       *[other] More than { $limit } matches
    }
pdfjs-page-landmark =
    .aria-label = Page { $page }
pdfjs-annotation-date-string = { $date }, { $time }
pdfjs-editor-free-text-button =
    .title = Text
pdfjs-editor-free-text-button-label = Text
pdfjs-editor-ink-button =
    .title = Draw
pdfjs-editor-ink-button-label = Draw
pdfjs-editor-stamp-button =
    .title = Add or edit images
pdfjs-editor-stamp-button-label = Add or edit images
pdfjs-editor-highlight-button =
    .title = Highlight
pdfjs-editor-highlight-button-label = Highlight
pdfjs-highlight-floating-button1 =
    .title = Highlight
    .aria-label = Highlight
pdfjs-highlight-floating-button-label = Highlight
pdfjs-editor-remove-ink-button =
    .title = Remove drawing
pdfjs-editor-remove-freetext-button =
    .title = Remove text
pdfjs-editor-remove-stamp-button =
    .title = Remove image
pdfjs-editor-remove-highlight-button =
    .title = Remove highlight
pdfjs-editor-free-text-color-input = Color
pdfjs-editor-free-text-size-input = Size
pdfjs-editor-ink-color-input = Color
pdfjs-editor-ink-thickness-input = Thickness
pdfjs-editor-ink-opacity-input = Opacity
pdfjs-editor-stamp-add-image-button =
    .title = Add image
pdfjs-editor-stamp-add-image-button-label = Add image
pdfjs-editor-free-highlight-thickness-input = Thickness
pdfjs-editor-free-highlight-thickness-title =
    .title = Change thickness when highlighting items other than text
pdfjs-free-text =
    .aria-label = Text Editor
pdfjs-free-text-default-content = Start typing…
pdfjs-ink =
    .aria-label = Draw Editor
pdfjs-ink-canvas =
    .aria-label = User-created image
pdfjs-editor-alt-text-button-label = Alt text
pdfjs-editor-alt-text-edit-button-label = Edit alt text
pdfjs-editor-alt-text-dialog-label = Choose an option
pdfjs-editor-alt-text-dialog-description = Alt text (alternative text) helps when people can’t see the image or when it doesn’t load.
pdfjs-editor-alt-text-add-description-label = Add a description
pdfjs-editor-alt-text-add-description-description = Aim for 1-2 sentences that describe the subject, setting, or actions.
pdfjs-editor-alt-text-mark-decorative-label = Mark as decorative
pdfjs-editor-alt-text-mark-decorative-description = This is used for ornamental images, like borders or watermarks.
pdfjs-editor-alt-text-cancel-button = Cancel
pdfjs-editor-alt-text-save-button = Save
pdfjs-editor-alt-text-decorative-tooltip = Marked as decorative
pdfjs-editor-alt-text-textarea =
    .placeholder = For example, “A young man sits down at a table to eat a meal”
pdfjs-editor-resizer-label-top-left = Top left corner — resize
pdfjs-editor-resizer-label-top-middle = Top middle — resize
pdfjs-editor-resizer-label-top-right = Top right corner — resize
pdfjs-editor-resizer-label-middle-right = Middle right — resize
pdfjs-editor-resizer-label-bottom-right = Bottom right corner — resize
pdfjs-editor-resizer-label-bottom-middle = Bottom middle — resize
pdfjs-editor-resizer-label-bottom-left = Bottom left corner — resize
pdfjs-editor-resizer-label-middle-left = Middle left — resize
pdfjs-editor-highlight-colorpicker-label = Highlight color
pdfjs-editor-colorpicker-button =
    .title = Change color
pdfjs-editor-colorpicker-dropdown =
    .aria-label = Color choices
pdfjs-editor-colorpicker-yellow =
    .title = Yellow
pdfjs-editor-colorpicker-green =
    .title = Green
pdfjs-editor-colorpicker-blue =
    .title = Blue
pdfjs-editor-colorpicker-pink =
    .title = Pink
pdfjs-editor-colorpicker-red =
    .title = Red
pdfjs-editor-highlight-show-all-button-label = Show all
unverified-signature-warning = This PDF file contains a digital signature. The PDF viewer can't verify if the signature is valid. Please download the file and open it in Acrobat Reader to verify the signature is valid.
pdfjs-infinite-scroll-button-label = Infinite scroll
pdfjs-open-in-app-button =
    .title = Open in app
pdfjs-open-in-app-button-label = Open in app