:- use_module(library(statistics)).
% Tasks (Id, processing time, deadline, weight penalty)
task(t1,2,5,1).
task(t2,4,7,6).
task(t3,1,11,2).
task(t4,3,9,3).
task(t5,3,8,2).


% Number of tasks
tasks(5).

% Initialize parameters
initialize:-write('Number of new generations: '),read(NG),
    (retract(generations(_));true),assertz(generations(NG)),
    write('Population dimensity: '),read(DP),
    (retract(population(_));true),assertz(population(DP)), % population dimension
    write('Probability of Crossover(%): '),read(P1), % crossover probability
    PC is P1/100,
    (retract(prob_crossover(_));true),assertz(prob_crossover(PC)),
    write('Probablility of Mutation(%): '),read(P2), % mutation probability
    PM is P2/100,
    (retract(prob_mutation(_));true),assertz(prob_mutation(PM)).
generate:-
    initialize,
    generate_population(Pop),
    write('Pop='),write(Pop),nl,
    evaluate_population(Pop,PopEv),
    write('PopEv='),write(PopEv),nl,
    order_population(PopEv,PopOrd),
    generations(NG),
    generate_generation(0,NG,PopOrd).

initialize_with_value:-write('Value less or equal than: '),read(NG),
    (retract(generations(_));true),assertz(generations(NG)),
    write('Population dimensity: '),read(DP),
    (retract(population(_));true),assertz(population(DP)), % population dimension
    write('Probability of Crossover(%): '),read(P1), % crossover probability
    PC is P1/100,
    (retract(prob_crossover(_));true),assertz(prob_crossover(PC)),
    write('Probablility of Mutation(%): '),read(P2), % mutation probability
    PM is P2/100,
    (retract(prob_mutation(_));true),assertz(prob_mutation(PM)).
generate_value:-
    initialize_with_value,
    generate_population(Pop),
    write('Pop='),write(Pop),nl,
    evaluate_population(Pop,PopEv),
    write('PopEv='),write(PopEv),nl,
    order_population(PopEv,PopOrd),
    generations(NG),
    generate_generation_value(0,NG,PopOrd).
%dont use this does not work
initialize_with_time:-write('Time less or equal than: '),read(NG),
    (retract(generations(_));true),assertz(generations(NG)),
    write('Population dimensity: '),read(DP),
    (retract(population(_));true),assertz(population(DP)), % population dimension
    write('Probability of Crossover(%): '),read(P1), % crossover probability
    PC is P1/100,
    (retract(prob_crossover(_));true),assertz(prob_crossover(PC)),
    write('Probablility of Mutation(%): '),read(P2), % mutation probability
    PM is P2/100,
    (retract(prob_mutation(_));true),assertz(prob_mutation(PM)).
%dont use this does not work at the moment.
generate_time:-
    initialize_with_time,
    generate_population(Pop),
    write('Pop='),write(Pop),nl,
    evaluate_population(Pop,PopEv),
    write('PopEv='),write(PopEv),nl,
    order_population(PopEv,PopOrd),
    generations(NG),
    generate_generation_time(0,NG,PopOrd).





generate_population(Pop):-
    population(TamPop),
    tasks(NumT),
    findall(Task,task(Task,_,_,_),ListTasks),
    generate_population(TamPop,ListTasks,NumT,Pop).

generate_population(0,_,_,[]):-!.
generate_population(TamPop,ListTasks,NumT,[Ind|Rest]):-
    TamPop1 is TamPop - 1,
    generate_population(TamPop1,ListTasks,NumT,Rest),
    generate_individual(ListTasks,NumT,Ind),
    not(member(Ind,Rest)).
generate_population(TamPop,ListTasks,NumT,L):-
    generate_population(TamPop,ListTasks,NumT,L).

generate_individual([G],1,[G]):-!.
generate_individual(ListTasks,NumT,[G|Rest]):-
    NumTemp is NumT + 1, % to use with random
    random(1,NumTemp,N),
    remove(N,ListTasks,G,NewList),
    NumT1 is NumT - 1,
    generate_individual(NewList,NumT1,Rest).

remove(1,[G|Rest],G,Rest).
remove(N,[G1|Rest],G,[G1|Rest1]):-N1 is N - 1,
    remove(N1,Rest,G,Rest1).

evaluate_population([],[]).
evaluate_population([Ind|Rest],[Ind*V|Rest1]):-
    evaluate(Ind,V),
evaluate_population(Rest,Rest1).
evaluate(Seq,V):-evaluate(Seq,0,V).
evaluate([],_,0).
evaluate([T|Rest],Inst,V):-
    task(T,Dur,Dline,Pen),
    InstEnd is Inst + Dur,
    evaluate(Rest,InstEnd,VRest),
    ((InstEnd =< Dline,!,VT is 0);(VT is (InstEnd - Dline)*Pen)),
    V is VT + VRest.

order_population(PopEv,PopEvOrd):-
    bsort(PopEv,PopEvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
    bsort(Xs,Zs),
    bexchange([X|Zs],Ys).

bexchange([X],[X]):-!.
bexchange([X*VX,Y*VY|L1],[Y*VY|L2]):-
    VX > VY,!,
    bexchange([X*VX|L1],L2).

bexchange([X|L1],[X|L2]):-bexchange(L1,L2).

%generate_generation_time doesnt work at the time
generate_generation_time(G,G,[H|_]):-!,
    write('Time ended, best solution: '),nl,write(H),nl.
generate_generation_time(N,G,[H|Pop]):-
    write('Time left: '),write(N),write(' best solution:'),nl,write(H),nl,  
    random_permutation(Pop, Pop1),   
    crossover(Pop1,NPop1),
    mutation(NPop1,NPop),   
    evaluate_population(NPop,NPopEv),      
    order_population(NPopEv,[H1*A|NPopOrd]),
    ((A =< G, N1 is G);(A > G, N1 is 0),!),

    generate_generation_time(N1,G,[H1*A|NPopOrd]).

generate_generation_value(G,G,Pop):-!,
    write('Given value: '),write(G),write(' reached:'),nl,write(Pop),nl.
generate_generation_value(_,G,Pop):-
    write('Given value: '),write(G),write(' was not reached:'),nl,write(Pop),nl,  
    random_permutation(Pop, Pop1),   
    crossover(Pop1,NPop1),
    mutation(NPop1,NPop),   
    evaluate_population(NPop,NPopEv),      
    order_population(NPopEv,[H1*A|NPopOrd]),
    ((A =< G, N1 is G);(A > G, N1 is 0),!),

    generate_generation_value(N1,G,[H1*A|NPopOrd]).


generate_generation(G,G,Pop):-!,
    write('Generation '),write(G),write(':'),nl,write(Pop),nl.
generate_generation(N,G,[H|Pop]):-
    write('Generation '),write(N),write(':'),nl,write([H|Pop]),nl,
      
    
    random_permutation([H|Pop], Pop1),% random_permutation changes order of given list
    
    crossover(Pop1,NPop1), 
    mutation(NPop1,NPop),

    del_rnd_n([H|Pop],NPop3),    %deletes penalty from every element of list
    append(NPop3,NPop, NPop2),%joint two given lists to one, we need this to get "N individuals"
    length(NPop2, N2), %returns length of given list, This is the N individuals

    evaluate_population(NPop2,NPopEv),%gives penalty for each element
    
    sort(2,@<, NPopEv,NPopEv1),%deletes duplicates and sort list to ascending order
    %length(NPopEv1, T),

    ((N2 >= 1, P is 0.2 * N2);%if N2 is greater than or equal to 1 P is 20% of N2
    (N2 < 1, P is 1)),%else P is 1,

    delete_p(P,NPopEv1, NPopEv2), %deletes P many elements from beginning of the list
    add_rnd_n(NPopEv2,_,NPopR), %adds a random number to every element of the list
    del_penalty(NPopR,NPopR1), %deletes penalty so we can order elements using the random number
    sort(2,@=<,NPopR1,NPopS), %sorts given list ascending order by the random number and deletes duplicates if any
    
    del_rnd_n(NPopS,NPopR2), %deletes penalty so we can order elements using the random number
    
    evaluate_population(NPopR2,NPopSEv), %gives penalty for each element

    %order_population(NPopEv1,NPopOrd),%order list to ascending order by the penalty
    
    N1 is N + 1,
    %generate_generation(N1,G,NPopOrd).
    generate_generation(N1,G,NPopSEv).


add_rnd_n([],L,L).
add_rnd_n([H|T],L,F):-
    random(0.0,1.0,Pc),
    add_rnd_n(T,[H*Pc|L],F),!.

del_rnd_n([],[]).
del_rnd_n([Ind*_],[Ind]).
del_rnd_n([Ind1*_,Ind2*_|Rest],[NInd1,NInd2|Rest1]):-
NInd1 = Ind1,NInd2 = Ind2,
del_rnd_n(Rest,Rest1).

del_penalty([],[]).
del_penalty([Ind*_*A],[Ind*A]).
del_penalty([Ind1*_*A,Ind2*_*B|Rest],[NInd1*A1,NInd2*B1|Rest1]):-
NInd1*A1 = Ind1*A,NInd2*B1 = Ind2*B,
del_penalty(Rest,Rest1).

delete_p(0,Rest1,Rest1).
delete_p(P, [_|Rest], Rest1):-
((P < 1, P1 is 0, delete_p(P1, Rest, Rest1));
(P1 is P -1, delete_p(P1,Rest, Rest1),!)).

generate_crossover_points(P1,P2):-generate_crossover_points1(P1,P2).
generate_crossover_points1(P1,P2):-
    tasks(N),
    NTemp is N + 1,
    random(1,NTemp,P11),
    random(1,NTemp,P21),
    P11 \== P21,!,
    ((P11 < P21,!,P1 = P11,P2 = P21);P1 = P21,P2 = P11).
generate_crossover_points1(P1,P2):-
    generate_crossover_points1(P1,P2).



crossover([],[]).
crossover([Ind*_],[Ind]).
crossover([Ind1*_,Ind2*_|Rest],[NInd1,NInd2|Rest1]):-
    generate_crossover_points(P1,P2),
    prob_crossover(Pcross),random(0.0,1.0,Pc),
    ((Pc =< Pcross,!,
  crosses(Ind1,Ind2,P1,P2,NInd1),
      crosses(Ind2,Ind1,P1,P2,NInd2));
      (NInd1 = Ind1,NInd2 = Ind2)),
      crossover(Rest,Rest1).

crosses(Ind1,Ind2,P1,P2,NInd11):-
    sublist(Ind1,P1,P2,Sub1),
    tasks(NumT),
    R is NumT - P2,
    rotate_right(Ind2,R,Ind21),
    eliminate(Ind21,Sub1,Sub2),
    P3 is P2 + 1,
    insert(Sub2,Sub1,P3,NInd1),
    eliminateh(NInd1,NInd11).

sublist(L1,I1,I2,L):-I1 < I2,!,
    sublist1(L1,I1,I2,L).
sublist(L1,I1,I2,L):-sublist1(L1,I2,I1,L).

sublist1([X|R1],1,1,[X|H]):-!,preencheh(R1,H).
sublist1([X|R1],1,N2,[X|R2]):-!,N3 is N2 - 1,
    sublist1(R1,1,N3,R2).
sublist1([_|R1],N1,N2,[h|R2]):-N3 is N1 - 1,
    N4 is N2 - 1,
    sublist1(R1,N3,N4,R2).

rotate_right(L,K,L1):-tasks(N),
    T is N - K,
    rr(T,L,L1).

preencheh([],[]).
preencheh([_|R1],[h|R2]):-
    preencheh(R1,R2).


rr(0,L,L):-!.
rr(N,[X|R],R2):-N1 is N - 1,
    append(R,[X],R1),
    rr(N1,R1,R2).

eliminate([],_,[]):-!.
eliminate([X|R1],L,[X|R2]):-not(member(X,L)),!,
    eliminate(R1,L,R2).
eliminate([_|R1],L,R2):-
    eliminate(R1,L,R2).

insert([],L,_,L):-!.
insert([X|R],L,N,L2):-
    tasks(T),
    ((N > T,!,N1 is N mod T);N1 = N),
    insert1(X,N1,L,L1),
    N2 is N + 1,
    insert(R,L1,N2,L2).

insert1(X,1,L,[X|L]):-!.
insert1(X,N,[Y|L],[Y|L1]):-
    N1 is N - 1,
    insert1(X,N1,L,L1).



eliminateh([],[]).
eliminateh([h|R1],R2):-!,
    eliminateh(R1,R2).
eliminateh([X|R1],[X|R2]):-
    eliminateh(R1,R2).

mutation([],[]).
mutation([Ind|Rest],[NInd|Rest1]):-
    prob_mutation(Pmut),
    random(0.0,1.0,Pm),
    ((Pm < Pmut,!,mutation1(Ind,NInd));NInd = Ind),
    mutation(Rest,Rest1).

mutation1(Ind,NInd):-
    generate_crossover_points(P1,P2),
    mutation22(Ind,P1,P2,NInd).

mutation22([G1|Ind],1,P2,[G2|NInd]):-!,
    P21 is P2 - 1,
    mutation23(G1,P21,Ind,G2,NInd).
mutation22([G|Ind],P1,P2,[G|NInd]):-
    P11 is P1 - 1, P21 is P2 - 1,
    mutation22(Ind,P11,P21,NInd).

mutation23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutation23(G1,P,[G|Ind],G2,[G|NInd]):-
    P1 is P - 1,
    mutation23(G1,P1,Ind,G2,NInd).
