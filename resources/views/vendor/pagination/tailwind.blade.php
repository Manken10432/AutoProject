@if ($paginator->hasPages())
    <nav role="navigation" aria-label="{{ __('Pagination Navigation') }}" class="flex items-center justify-between mt-6">

        {{-- Mobile --}}
        <div class="flex justify-between flex-1 sm:hidden gap-2">
            @if ($paginator->onFirstPage())
                <span class="inline-flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-400 bg-white border border-gray-200 cursor-not-allowed">
                    &lsaquo; Anterior
                </span>
            @else
                <a href="{{ $paginator->previousPageUrl() }}" rel="prev"
                   class="inline-flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-700 bg-white border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors">
                    &lsaquo; Anterior
                </a>
            @endif

            @if ($paginator->hasMorePages())
                <a href="{{ $paginator->nextPageUrl() }}" rel="next"
                   class="inline-flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-700 bg-white border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors">
                    Siguiente &rsaquo;
                </a>
            @else
                <span class="inline-flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-400 bg-white border border-gray-200 cursor-not-allowed">
                    Siguiente &rsaquo;
                </span>
            @endif
        </div>

        {{-- Desktop --}}
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-600">
                    Mostrando
                    @if ($paginator->firstItem())
                        <span class="font-bold">{{ $paginator->firstItem() }}</span> – <span class="font-bold">{{ $paginator->lastItem() }}</span>
                    @else
                        {{ $paginator->count() }}
                    @endif
                    de <span class="font-bold">{{ $paginator->total() }}</span> resultados
                </p>
            </div>

            <div>
                <span class="inline-flex">
                    {{-- Prev --}}
                    @if ($paginator->onFirstPage())
                        <span class="inline-flex items-center px-3 py-2 text-sm font-bold text-gray-300 bg-white border border-gray-200 cursor-not-allowed">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                        </span>
                    @else
                        <a href="{{ $paginator->previousPageUrl() }}" rel="prev"
                           class="inline-flex items-center px-3 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-300 hover:bg-red-700 hover:text-white hover:border-red-700 transition-colors"
                           aria-label="Anterior">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                        </a>
                    @endif

                    {{-- Pages --}}
                    @foreach ($elements as $element)
                        @if (is_string($element))
                            <span class="inline-flex items-center px-4 py-2 -ml-px text-sm text-gray-500 bg-white border border-gray-300 cursor-default">{{ $element }}</span>
                        @endif
                        @if (is_array($element))
                            @foreach ($element as $page => $url)
                                @if ($page == $paginator->currentPage())
                                    <span aria-current="page"
                                          class="inline-flex items-center px-4 py-2 -ml-px text-sm font-bold text-white border border-red-700 cursor-default"
                                          style="background-color:#C3002F;">
                                        {{ $page }}
                                    </span>
                                @else
                                    <a href="{{ $url }}"
                                       class="inline-flex items-center px-4 py-2 -ml-px text-sm font-bold text-gray-700 bg-white border border-gray-300 hover:bg-red-700 hover:text-white hover:border-red-700 transition-colors"
                                       aria-label="Página {{ $page }}">
                                        {{ $page }}
                                    </a>
                                @endif
                            @endforeach
                        @endif
                    @endforeach

                    {{-- Next --}}
                    @if ($paginator->hasMorePages())
                        <a href="{{ $paginator->nextPageUrl() }}" rel="next"
                           class="inline-flex items-center px-3 py-2 -ml-px text-sm font-bold text-gray-600 bg-white border border-gray-300 hover:bg-red-700 hover:text-white hover:border-red-700 transition-colors"
                           aria-label="Siguiente">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                        </a>
                    @else
                        <span class="inline-flex items-center px-3 py-2 -ml-px text-sm font-bold text-gray-300 bg-white border border-gray-200 cursor-not-allowed">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                        </span>
                    @endif
                </span>
            </div>
        </div>
    </nav>
@endif
