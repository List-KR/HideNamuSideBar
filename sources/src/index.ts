import PLimit from 'p-limit'
import {SplitElementsIntoArrayLength} from 'multithread-array'

type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

// eslint-disable-next-line no-negated-condition
const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

const Cocurrent = (navigator.hardwareConcurrency ?? 4) < 4 ? 4 : navigator.hardwareConcurrency
const SideBarFetchEvent = new Event('SideBarFetchEvent')

const HideFunctionNano = (ElementsInArticle: Element[]) => {
  var TargetedElements = ElementsInArticle.filter(Element => Element instanceof HTMLElement) as HTMLElement[]
  TargetedElements = TargetedElements.filter(HTMLElementInArticle => {
    return HTMLElementInArticle.querySelectorAll('div[style*="display"] > span').length !== 0
  })
  return TargetedElements
}

const HideElements = (TargetElements: HTMLElement[]) => {
	TargetElements.forEach(TargetElement => {
		TargetElement.style.setProperty('display', 'none', 'important')
	})
}

const HideFunction = async () => {
  const ElementsInArticle = Array.from(document.querySelectorAll('main > div[class]:not([class=" "]) div[class*=" "] ~ div[class]:not([class*=" "]) ~ div[class*=" "]'))
  const PLimitInstance = PLimit(Cocurrent)
  const PLimitJobs: Promise<HTMLElement[]>[] = []
  let TargetedElements: HTMLElement[] = []
  for (const ElementsInArticleChunk of SplitElementsIntoArrayLength(ElementsInArticle, {Count: Cocurrent})) {
    PLimitJobs.push(PLimitInstance(() => HideFunctionNano(ElementsInArticleChunk)))
  }
  TargetedElements = await Promise.all(PLimitJobs).then(Results => Results.flat())
  console.debug('[HideNamuSideBar:index] HideFunction:', TargetedElements)
  HideElements(TargetedElements)
}

Win.fetch = new Proxy(Win.fetch, {
  apply: (Target, ThisArg, Args) => {
    if (Args[0] === '/sidebar.json') {
      Win.dispatchEvent(SideBarFetchEvent)
      return
    }

    return Reflect.apply(Target, ThisArg, Args)
  }
})

Win.addEventListener('SideBarFetchEvent', () => {setTimeout(HideFunction, 750)})